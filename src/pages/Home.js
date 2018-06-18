import React, { Component } from 'react';
import PostList from '../components/PostList';
import { withRoot } from '../contexts/RootContext';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

class Home extends Component {
  
  extractThumbnailInfo = (html) => {
    let summary = '';
    let thumbnailSrc = '';
    let existThumbnailImg = false;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks, contentBlock.entityMap);
      const editorState = EditorState.createWithContent(contentState);
      const raw = convertToRaw(editorState.getCurrentContent());

      const blocks = raw["blocks"]; 
      const entityMap = raw["entityMap"];

      for(let i = 0; i < blocks.length; i++){
        const currentBlock = blocks[i];

        if(!existThumbnailImg){
          for(let j = 0; j < currentBlock.entityRanges.length; j++){
            const currentEntityRange = currentBlock.entityRanges[j];
            const mapData = entityMap[currentEntityRange.key];

            if(mapData.type === "IMAGE"){
              existThumbnailImg = true;
              thumbnailSrc = mapData.data["src"];
            }
          }
        }

        const blockText = currentBlock.text;
        let newSummary = summary + blockText;
        summary = newSummary.slice(0, 100);
        
        if(summary.length >= 100 && thumbnailSrc)
          break;
      }
    }

    return {thumbnailSrc, summary};
  }

  loadPosts = () => {
    const { contractAddress, abi, setPosts } = this.props;
    const { extractThumbnailInfo } = this;
    let web3 = window.web3;
    const ehterBoardContract = web3.eth.contract(abi);
    const etherBoard = ehterBoardContract.at(contractAddress);
    
    etherBoard.getPostCount((err, res) => {
      if(!err){
        let newPosts = [];
        const count = res.toNumber();
        
        for(let i = count - 1; i >= 0; i--){
          etherBoard.getPost(i , (err1, res1) => {
            if(!err1){
              const title = String(res1[0]);
              const content = String(res1[1]);
              const like = parseInt(res1[2], 10);
              const dislike = parseInt(res1[3], 10);
              const timestamp = parseInt(res1[4], 10);
              const thumbnailInfo = extractThumbnailInfo(content);

              etherBoard.getReplyCountFromPost(i , (err2, res2) => {
                if(!err2){
                  const repliesCount = res2.toNumber();
                  newPosts.push(
                    {
                      id : i, 
                      thumbnailSrc : thumbnailInfo.thumbnailSrc, 
                      summary : thumbnailInfo.summary, 
                      title, 
                      content, 
                      like, 
                      dislike, 
                      timestamp,
                      replies: [], 
                      repliesCount});

                  if(i === 0){
                    setPosts(newPosts);
                  }
                }
              });
            }
          });
        }
      }
    });
  }

  shouldComponentUpdate = (nextProps, nextState) =>{
    return true;
  }

  componentDidMount = () =>{
    this.loadPosts();
  }

  render() {
    const { posts, contractAddress, abi, setLikeToPost, setDislikeToPost, setRepliesToPost } = this.props;

    return (
        <div>
          <PostList 
            posts={posts}
            contractAddress={contractAddress}
            abi={abi}
            setLikeToPost={setLikeToPost}
            setDislikeToPost={setDislikeToPost}
            setRepliesToPost={setRepliesToPost}/>
        </div>
    );
  }
}

export default withRoot(Home);
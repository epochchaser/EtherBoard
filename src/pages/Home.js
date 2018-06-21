import React, { Component } from 'react';
import PostList from '../components/PostList';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { withRoot } from '../contexts/RootContext';
import { withStyles } from '@material-ui/core/styles';
import ErrorSnackBar from '../components/ErrorSnackBar';
import PropTypes from 'prop-types';

const styles = theme => ({

});

class Home extends Component {
  state = {
    snackBarErrorMsg: '',
    openErrorSnackBar : false
  }
  
  handleOpenErrorSnackBar = (snackBarErrorMsg) => {
    this.setState(
      {
         openErrorSnackBar: true ,
         snackBarErrorMsg : snackBarErrorMsg
      }
    );
  };

  handleCloseErrorSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openErrorSnackBar: false });
  };

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

  loadPosts = async() => {
    const { setPosts, getPostCount, getPost, getReplyCountFromPost } = this.props;
    const { extractThumbnailInfo, handleOpenErrorSnackBar } = this;
    const newPosts = [];

    try
    {
      const postCount = await getPostCount();
        
      for(let i = postCount - 1; i >= 0; i--){
        const post = await getPost(i);
        const title = String(post[0]);
        const content = String(post[1]);
        const like = parseInt(post[2], 10);
        const dislike = parseInt(post[3], 10);
        const timestamp = parseInt(post[4], 10);
        const thumbnailInfo = extractThumbnailInfo(content);

        const repliesCount = await getReplyCountFromPost(i);
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
    }catch(err){
      handleOpenErrorSnackBar(err.message);
    }
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
            <ErrorSnackBar errMsg={this.state.snackBarErrorMsg} isOpen={this.state.openErrorSnackBar} onClose={this.handleCloseErrorSnackBar}/>
        </div>
    );
  }
}


Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Home));
import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { withStyles } from '@material-ui/core/styles';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const styles = ({
});

class Writing extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

      render() {
        const { editorState } = this.state;

        return (
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
        );
      }
    }

Writing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Writing);

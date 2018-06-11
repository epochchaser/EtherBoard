import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const styles = theme => ({
});

class Writing extends React.Component {
    constructor(props) {
        super(props);
      }
      render() {
        return (
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
            />
        );
      }
    }

Writing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Writing);

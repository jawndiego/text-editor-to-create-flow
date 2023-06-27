import {$getRoot, $getSelection} from 'lexical';
import {useEffect} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
// import { HeadingNode } from '@lexical/rich-text';



type EditorState = any; // Replace 'any' with the actual type if available

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!

const theme = {};

const onError = (error: Error) => {
  console.error(error);
};

const onChange = (editorState: EditorState) => {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
};


// const MyCustomAutoFocusPlugin: React.FC = () => {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     // Focus the editor when the effect fires!
//     editor.focus();
//   }, [editor]);

//   return null;
// };

const MyEditor: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const handleFocus = () => {
    editor.focus();
  };

  useEffect(() => {
    handleFocus();
  }, [editor]);

  return (
    <div onClick={handleFocus} className="bg-white p-4 w-1/2 h-1/2">
      <RichTextPlugin 
        contentEditable={<ContentEditable className="h-full w-full border-gray-300 relative rounded shadow" />}
        placeholder={<div className="absolute inset-0 flex items-center justify-center text-gray-400">spill away...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
    </div>
  );
};

const EditorWrapper: React.FC = () => {
  const initialConfig = {
    namespace: 'myRiver',
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <MyEditor />
    </LexicalComposer>
  );
};

export default EditorWrapper;
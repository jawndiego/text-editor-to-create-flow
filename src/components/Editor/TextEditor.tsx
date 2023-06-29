import {$createTextNode, $getRoot, $getSelection, $isRangeSelection, EditorState} from 'lexical';

import {LexicalComposer} from '@lexical/react/LexicalComposer';

import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {CharacterLimitPlugin} from '@lexical/react/LexicalCharacterLimitPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import {ClearEditorPlugin} from '@lexical/react/LexicalClearEditorPlugin';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';
import {CollaborationPlugin} from '@lexical/react/LexicalCollaborationPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HashtagPlugin} from '@lexical/react/LexicalHashtagPlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {HorizontalRulePlugin} from '@lexical/react/LexicalHorizontalRulePlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {TabIndentationPlugin} from '@lexical/react/LexicalTabIndentationPlugin';
import useLexicalEditable from '@lexical/react/useLexicalEditable';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {CAN_USE_DOM} from '../../utils/canUseDOM';


// import {createWebsocketProvider} from './collaboration';
import {useSettings} from '../../context/SettingsContext';
import {useSharedHistoryContext} from '../../context/SharedHistoryContext';
import TableCellNodes from '../../nodes/TableCellNodes';
import ActionsPlugin from '../../plugins/ActionsPlugin';
import AutocompletePlugin from '../../plugins/AutocompletePlugin';
import AutoEmbedPlugin from '../../plugins/AutoEmbedPlugin';
import AutoLinkPlugin from '../../plugins/AutoLinkPlugin';
import CodeActionMenuPlugin from '../../plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from '../../plugins/CodeHighlightPlugin';
import CollapsiblePlugin from '../../plugins/CollapsiblePlugin';
import CommentPlugin from '../../plugins/CommentPlugin';
import ComponentPickerPlugin from '../../plugins/ComponentPickerPlugin';
import ContextMenuPlugin from '../../plugins/ContextMenuPlugin';
import DragDropPaste from '../../plugins/DragDropPastePlugin';
import DraggableBlockPlugin from '../../plugins/DraggableBlockPlugin';
import EmojiPickerPlugin from '../../plugins/EmojiPickerPlugin';
import EmojisPlugin from '../../plugins/EmojisPlugin';
import EquationsPlugin from '../../plugins/EquationsPlugin';
import ExcalidrawPlugin from '../../plugins/ExcalidrawPlugin';
import FigmaPlugin from '../../plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from '../../plugins/FloatingLinkEditorPlugin';
import FloatingTextFormatToolbarPlugin from '../../plugins/FloatingTextFormatToolbarPlugin';
import ImagesPlugin from '../../plugins/ImagesPlugin';
import InlineImagePlugin from '../../plugins/InlineImagePlugin';
import KeywordsPlugin from '../../plugins/KeywordsPlugin';
import LinkPlugin from '../../plugins/LinkPlugin';
import ListMaxIndentLevelPlugin from '../../plugins/ListMaxIndentLevelPlugin';
import MarkdownShortcutPlugin from '../../plugins/MarkdownShortcutPlugin';
import {MaxLengthPlugin} from '../../plugins/MaxLengthPlugin';
import MentionsPlugin from '../../plugins/MentionsPlugin';
import PollPlugin from '../../plugins/PollPlugin';
import SpeechToTextPlugin from '../../plugins/SpeechToTextPlugin';
import TabFocusPlugin from '../../plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from '../../plugins/TableActionMenuPlugin';
import TableCellResizer from '../../plugins/TableCellResizer';
import TableOfContentsPlugin from '../../plugins/TableOfContentsPlugin';
import {TablePlugin as NewTablePlugin} from '../../plugins/TablePlugin';
import ToolbarPlugin from '../../plugins/ToolbarPlugin';
import TreeViewPlugin from '../../plugins/TreeViewPlugin';
import TwitterPlugin from '../../plugins/TwitterPlugin';
import YouTubePlugin from '../../plugins/YouTubePlugin';
import PlaygroundEditorTheme from '../../themes/PlaygroundEditorTheme';
import ContentEditable from '../../ui/ContentEditable';
import Placeholder from '../../ui/Placeholder';
import { $createHeadingNode, HeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { LinkNode } from '@lexical/link';
import { ImageNode } from '../../nodes/ImageNode';
import { TableNode } from '../../nodes/TableNode';
import { TableCellNode, TableRowNode } from '@lexical/table';
import {TablePlugin} from '@lexical/react/LexicalTablePlugin';

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!

interface Props {}

type HeadingTag = 'h1' | 'h2' | 'h3'
function HeadingPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext();  
    const headingTags: HeadingTag[] = ['h1', 'h2','h3']  
    const onClick = (tag: HeadingTag ): void => {
        editor.update(() => {
           const selection = $getSelection();
           if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode(tag))

           }
        });
    };
    return <div>{headingTags.map((tag) => (
        <button onClick={() => { onClick(tag) }} key={tag}>{tag.toUpperCase()} </button>
    ))}</div>
}

function onError(error: Error): void {
    console.error(error)
}

function MyOnChangePlugin(props: { onChange: (editorState: EditorState)=> void}): null {
    const [editor] = useLexicalComposerContext();
    const { onChange } = props; 
    React.useEffect(() => {
        return editor.registerUpdateListener(({editorState}) => {
            onChange(editorState);
        });
    }, [onChange, editor]);
    return null
}

export default function Editor(): JSX.Element {

    // const {historyState} = useSharedHistoryContext();
    // const {
    //   settings: {
    //     isCollab,
    //     isAutocomplete,
    //     isMaxLength,
    //     isCharLimit,
    //     isCharLimitUtf8,
    //     isRichText,
    //     showTreeView,
    //     showTableOfContents,
    //     shouldUseLexicalContextMenu,
    //     tableCellMerge,
    //     tableCellBackgroundColor,
    //   },
    // } = useSettings();
    // const isEditable = useLexicalEditable();
    // const text = isCollab
    //   ? 'Enter some collaborative rich text...'
    //   : isRichText
    //   ? 'Enter some rich text...'
    //   : 'Enter some plain text...';
    // const placeholder = <Placeholder>{text}</Placeholder>;
    // const [floatingAnchorElem, setFloatingAnchorElem] =
    //   useState<HTMLDivElement | null>(null);
    // const [isSmallWidthViewport, setIsSmallWidthViewport] =
    //   useState<boolean>(false);
  
    // const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    //   if (_floatingAnchorElem !== null) {
    //     setFloatingAnchorElem(_floatingAnchorElem);
    //   }

    const {
        settings: {
          isCollab,
          isAutocomplete,
          isMaxLength,
          isCharLimit,
          isCharLimitUtf8,
          isRichText,
          showTreeView,
          showTableOfContents,
          shouldUseLexicalContextMenu,
          tableCellMerge,
          tableCellBackgroundColor,
        },
      } = useSettings();

    const initialConfig = {
        namespace: 'Editor',
        theme: PlaygroundEditorTheme,
        onError,
        nodes: [...TableCellNodes, TableNode, TableCellNode, TableRowNode],
        plugins: [ToolbarPlugin, ActionsPlugin, ImagesPlugin, InlineImagePlugin, LinkPlugin, EmojisPlugin,HashtagPlugin, KeywordsPlugin, MarkdownShortcutPlugin, CodeHighlightPlugin, 
        ListPlugin, CheckListPlugin, ListMaxIndentLevelPlugin, NewTablePlugin, TableCellResizer]
    };

    return (
        <>
        
         <LexicalComposer initialConfig={initialConfig}>
         <div className="bg-white p-4 flex w-full h-full justify-center rounded shadow mx-auto my-12">
         <ToolbarPlugin />
         <RichTextPlugin
        contentEditable={
          <ContentEditable className="bg-white p-4 w-full h-full rounded shadow relative"/>
    }
        placeholder={
          <div className="absolute flex center text-gray-400">
            type away..
         </div>
    }
        ErrorBoundary={LexicalErrorBoundary}
        />
            <CodeHighlightPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <TableCellResizer />
            <NewTablePlugin cellEditorConfig={initialConfig}>
              <AutoFocusPlugin />
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="TableNode__contentEditable" />
                }
                placeholder={null}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <MentionsPlugin />
              <HistoryPlugin />
              <ImagesPlugin captionsEnabled={false} />
              <LinkPlugin />
              <LexicalClickableLinkPlugin />
              <FloatingTextFormatToolbarPlugin />
            </NewTablePlugin>
            <ImagesPlugin />
            <InlineImagePlugin />
            <LinkPlugin />
            <PollPlugin />
            <TwitterPlugin />
            <YouTubePlugin />
            <FigmaPlugin />
            <ActionsPlugin isRichText={isRichText} />
            {/* {!isEditable && <LexicalClickableLinkPlugin />}
            <HorizontalRulePlugin />
            <EquationsPlugin />
            <ExcalidrawPlugin />
            <TabFocusPlugin />
            <TabIndentationPlugin />
            <CollapsiblePlugin /> */}

          </div> 
          </LexicalComposer>
        </>
          
      );
    }
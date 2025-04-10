import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiSelector = () => {
  const [emoji, setEmoji] = useState("");

  const onEmojiClick = (event: any, emojiObject: any) => {
    setEmoji(emojiObject.emoji);
  };

  return (
    <div>
      <EmojiPicker onEmojiClick={onEmojiClick} />
      <p>Selected Emoji: {emoji}</p>
    </div>
  );
};

export default EmojiSelector;

import {
  BsEmojiHeartEyesFill,
  BsFillEmojiExpressionlessFill,
  BsFillEmojiAngryFill,
} from "react-icons/bs";
export default function Reactions({ id }: { id: string }) {
  return (
    <div className="flex justify-center items-center gap-4">
      <div className="flex items-center gap-1">
        <BsEmojiHeartEyesFill className="text-3xl text-yellow-500" />
        <span>55</span>
      </div>
      <div className="flex items-center gap-1">
        <BsFillEmojiExpressionlessFill className="text-3xl text-yellow-500" />
        <span>5</span>
      </div>
      <div className="flex items-center gap-1">
        <BsFillEmojiAngryFill className="text-3xl text-yellow-500" />
        <span>11</span>
      </div>
    </div>
  );
}

import { cx, formatChatDate } from "../../../core/utilities/helpers";

interface Props {
  data: Message;
  styling?: string;
  isMine?: boolean;
}

export default function MessageBox({ data, isMine, styling }: Props) {
  return (
    <div className={cx("mb-4 w-full", isMine ? "text-right" : "text-left", styling!)}>
      <div className={cx("msg", isMine ? "user" : "")}>
        <p className="mb-3">{data?.content}</p>
        <p className="text-end text-xs text-gray-500">
          {formatChatDate(data?.timestamp || "")}
        </p>
      </div>
    </div>
  );
}

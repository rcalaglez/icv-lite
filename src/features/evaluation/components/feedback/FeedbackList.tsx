import { CheckCircle, XCircle } from "lucide-react";

export const FeedbackList = ({
  items,
  type,
}: {
  items: string[];
  type: "strength" | "improvement";
}) => (
  <ul className="list-none p-0 m-0 space-y-2">
    {items.map((item, index) => (
      <li key={index} className="flex items-start">
        {type === "strength" ? (
          <CheckCircle className="text-green-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
        ) : (
          <XCircle className="text-red-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
        )}
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

import type { ReactNode } from "react";

type ShellProps = {
  children?: ReactNode;
};

/** غلاف جدول المقالات — رأس رمادي وصفوف بيضاء */
export function ArticleMarkdownTable({ children }: ShellProps) {
  return (
    <div className="article-table-shell my-8" dir="rtl">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="article-table w-full min-w-[520px] border-collapse text-right">{children}</table>
        </div>
      </div>
    </div>
  );
}

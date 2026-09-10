interface UsersFooter {
  page: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function UsersFooter({
  page, total, onPrevious, onNext
}: UsersFooter) {

  return (
    <div className="users-footer">
      {page === 1 ? <div></div> :
        <button onClick={onPrevious}>上一页</button>}

      <div>{`${page} / ${total}`}</div>

      {page === total ? <div></div> :
        <button onClick={onNext}>下一页</button>}
    </div>
  );
}
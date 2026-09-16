import { Link } from "react-router-dom";

interface PageHeaderProps {
  route?: string,
  backText?: string,
  title: string,
  pageText?: string
  action?: React.ReactNode
}

export default function PageHeader({ route, backText, title, pageText, action }: PageHeaderProps) {

  return (
    <div className="page-header">
      <div className="page-header-left">
        {route ?
          (<Link to={route} className="link-default">
            ← {backText}
          </Link>)
          : ''}

        <p className="page-header-title">{title}</p>

        {pageText ?
          (<p>{pageText}</p>)
          :
          ''}
      </div>

      <div>
        {action}
      </div>
    </div>
  );

}
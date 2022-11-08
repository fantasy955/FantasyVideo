import { useRouteError, useNavigate } from "react-router-dom";
import { useEffect } from 'react'

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  let timer: null | NodeJS.Timer = null
  useEffect(() => {
    if (!timer) {
      timer = setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  })
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>导航错误， 即将返回首页!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
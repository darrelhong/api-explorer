import { Link, useSearchParams } from "react-router-dom";

import "./ProviderInfo.css";
import { useProviderQuery } from "../../queries/provider";

const ProviderInfo = () => {
  const [searchParams] = useSearchParams();
  const api = searchParams.get("api") as string;
  const provider = searchParams.get("provider") as string;

  const { isLoading, isError, data } = useProviderQuery(provider);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred, please try again</div>;

  const providerData = data[api];
  console.log({ providerData });

  return (
    <div className="provider-info">
      <div className="provider-info--main">
        <div className="provider-info--title-row">
          <img
            src={providerData.info["x-logo"].url}
            alt={providerData.info.title}
            onError={(e) => {
              // replace with a placeholder image
              e.currentTarget.src = "/public/vite.svg";
            }}
          />
          <h1>{providerData.info.title}</h1>
        </div>
        <div className="provider-info--content">
          <h2>Description</h2>
          <p>{providerData.info?.description}</p>
          <h2>Swagger</h2>
          <p>{providerData?.swaggerUrl}</p>
          <h2>Contact</h2>
          <div className="provider-info--contact-grid">
            <p>Email</p>
            <p>{providerData.info.contact?.email}</p>
            <p>Name</p>
            <p>{providerData.info.contact?.name}</p>
            <p>URL</p>
            <p>{providerData.info.contact?.url}</p>
          </div>
        </div>
      </div>
      <Link to="/" className="btn">
        Explore more APIs
      </Link>
    </div>
  );
};

export default ProviderInfo;

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useMeasure } from "react-use";

import "./ApiList.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProviderData } from "../types/provider";
import { useProviderQuery } from "../queries/provider";

export const ApiList = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["providers"],
    queryFn: async () => {
      const response = await fetch("https://api.apis.guru/v2/providers.json");
      const json = await response.json();
      return json.data as string[];
    },
  });

  return (
    <>
      <div className="api-list--title">Select provider</div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>An error occurred, please try again</div>}

      <ul className="api-list--list">
        {data?.map((provider) => (
          <ApiListItem key={provider} provider={provider} />
        ))}
      </ul>
    </>
  );
};

const ApiListItem = ({ provider }: { provider: string }) => {
  const [open, setOpen] = useState(false);

  const [enableQuery, setEnableQuery] = useState(false);

  const { isLoading, isError, data } = useProviderQuery(provider, {
    enabled: enableQuery,
  });

  const [ref, stuff] = useMeasure<HTMLDivElement>();

  return (
    <li
      className={clsx("api-list--list-item", { open })}
      onMouseEnter={() => setEnableQuery(true)}
    >
      <button onClick={() => setOpen((prev) => !prev)}>
        <span>{provider}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width={12}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div
        className={clsx("api-list--list-item-content", { open })}
        style={{ height: open ? `${stuff.height + 8}px ` : 0 }}
      >
        <div className="collapse" ref={ref}>
          {isLoading && <div>Loading...</div>}
          {isError && <div>An error occurred, please try again</div>}
          <ul className="provider-list--list">
            {Object.entries(data ?? {}).map(([key, value]) => (
              <li key={key}>
                <Link
                  className="provider-list--list-item"
                  to={`provider?api=${key}&provider=${provider}`}
                >
                  <img
                    src={value.info["x-logo"].url}
                    onError={(e) => {
                      // replace with a placeholder image
                      e.currentTarget.src = "/vite.svg";
                    }}
                  />
                  {value.info.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

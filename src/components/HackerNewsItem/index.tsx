import React from "react";

import useFetch from "../../hook/useFetch";
import { HACKER_NEWS_API_BASE_URL } from "../../config/constants";

import s from "./index.module.css";

interface Props {
    itemId: number;
}

const HackerNewsItem: React.FC<Props> = ({ itemId }) => {
    const { data: hackerNewsItem, error } = useFetch<TNewsItem>(
        `${HACKER_NEWS_API_BASE_URL}/item/${itemId}.json?print=pretty`
    );

    if (error) return <p>Error fetching this story</p>;

    return (
        <>
            {hackerNewsItem && (
                <div className={s.container}>
                    {hackerNewsItem?.by && (
                        <p className={s.author}>
                            {hackerNewsItem.by.toUpperCase()}
                        </p>
                    )}

                    {hackerNewsItem?.title && (
                        <div className={s.title}>
                            <div>{hackerNewsItem.title}</div>
                            <a
                                href={hackerNewsItem.url}
                                className={s.link}
                                target="_blank"
                            >
                                <img
                                    src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-link-1.png&r=240&g=248&b=255"
                                    width="16"
                                    alt="link"
                                />
                            </a>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default HackerNewsItem;

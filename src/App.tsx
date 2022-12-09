import React, { useState, useEffect, Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Loader from "./components/Loader";
import useFetch from "./hook/useFetch";

import { HACKER_NEWS_API_BASE_URL } from "./config/constants";

const HackerNewsItem = React.lazy(() => import("./components/HackerNewsItem"));

const App: React.FC = () => {
    const size = 20;

    const { data, error } = useFetch<number[]>(
        `${HACKER_NEWS_API_BASE_URL}/topstories.json?print=pretty`
    );

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [newsIdsToRender, setNewsIdsToRender] = useState<number[]>([]);

    const fetchMoreData = () => {
        if (data) {
            if (newsIdsToRender.length >= data.length) {
                setHasMore(false);
                return;
            }

            setNewsIdsToRender((prevIds) => {
                return [
                    ...prevIds,
                    ...data.slice(newsIdsToRender.length, 100 + page * size),
                ];
            });

            setPage((page) => page + 1);
        }
    };

    useEffect(() => {
        if (data) setNewsIdsToRender(data.slice(0, 100));
    }, [data]);

    if (error) return <p>There is an error.</p>;

    return (
        <>
            <Suspense fallback={<Loader />}>
                <InfiniteScroll
                    dataLength={newsIdsToRender.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {newsIdsToRender.map((itemId) => (
                        <HackerNewsItem itemId={itemId} key={itemId} />
                    ))}
                </InfiniteScroll>
            </Suspense>
        </>
    );
};

export default App;

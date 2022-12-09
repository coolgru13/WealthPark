import { RotatingLines } from "react-loader-spinner";

import s from "./index.module.css";

const AppLoader = () => {
    return (
        <div className={s.container}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};

export default AppLoader;

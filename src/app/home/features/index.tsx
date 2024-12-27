"use client";

import { createStyles } from "antd-style";
import NavHeader from "../components/navigation/NavHeader";
import Landing from "./landing";


const useStyles = createStyles(({ css, token }) => ({
    page: css`  
        background-color: ${token.colorFillTertiary};
        display: flex;
        padding: 0.5rem;
    `,
}));

export default function HomePage() {
    const { styles } = useStyles();
    return (
        <div className={styles.page}>
            <NavHeader />
            <Landing />
        </div>
    );
}
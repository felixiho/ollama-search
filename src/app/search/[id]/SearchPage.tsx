"use client";

import { createStyles } from "antd-style";
import NavHeader from "../../home/components/navigation/NavHeader";
import { Search } from "../../home/features/search";


const useStyles = createStyles(({ css, token }) => ({
    page: css`  
        background-color: ${token.colorFillTertiary};
        display: flex;
        padding: 0 0.5rem;
        
    `,
}));

export default function SearchPage({ id }: { id: string }) {
    const { styles } = useStyles();
    return (
        <div className={styles.page}>
            <NavHeader />
            <Search id={id} />
        </div>
    );
}

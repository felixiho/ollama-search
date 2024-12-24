import { useSearchStore } from "@/store/search"
import { Flex, Skeleton, Typography } from "antd"



const { Paragraph } = Typography
const LoadingSkeleton = () => {
    const [loadingWeb] = useSearchStore(s => [s.loadingWeb])

    return (
        <Flex vertical>
            {
                loadingWeb ? <Paragraph strong>Searching the web...</Paragraph> : <Paragraph strong>Generating answer...</Paragraph>
            }
            <Skeleton active />
        </Flex>
    )
}
export default LoadingSkeleton
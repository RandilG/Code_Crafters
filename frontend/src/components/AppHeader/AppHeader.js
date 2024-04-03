import { BellFilled, MailOutlined } from "@ant-design/icons";
import UnionImage from "./../../Assets/Union.png";
import { Badge, Image, Space, Typography } from "antd";


function AppHeader() {
    return <div className="AppHeader">
        <Image 
        width={135}
        src={UnionImage}>
        </Image>
        <Typography.Title style={{ color: 'white' }}>Financial Admin</Typography.Title>
        <Space>
            <Badge count={10} dot>
                <MailOutlined  style={{fontSize:24}}/>
            </Badge>
            <Badge count={10}>
                <BellFilled style={{fontSize:24}}/>
            </Badge>
        </Space>

    </div>;
}

export default AppHeader;
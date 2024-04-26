import { BellFilled, MailOutlined } from "@ant-design/icons";
import UnionImage from "./../../Assets/Union.png";
import { Badge, Image, Space, Typography, Input } from "antd";
const { Search } = Input;
const onSearch = (value) => console.log(value);


function AppHeader() {
    return <div className="AppHeader">
        <Image
            width={135}
            src={UnionImage}>
        </Image>
        <Typography.Title style={{ color: 'white' }}>Financial Admin</Typography.Title>
        <Space>
            <div className="search-bar">
                <Space direction="vertical" >
                    <Search
                        placeholder="Search...."
                        onSearch={onSearch}
                        style={{
                            width: 300,
                        }}
                    />
                </Space>
            </div>
            <Badge count={10} dot>
                <MailOutlined style={{ fontSize: 24 }} />
            </Badge>
            <Badge count={10}>
                <BellFilled style={{ fontSize: 24 }} />
            </Badge>
        </Space>

    </div>;
}

export default AppHeader
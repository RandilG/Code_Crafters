import { DollarOutlined } from "@ant-design/icons";
import { Card, Space, Statistic } from "antd";
import BarGraph from "../../components/Graphs/TestGraph";
import IncomeInfoTableJobPoster from "../../components/Tables/IncomeInfoTableJobPoster";

function Dashboard() {
    return (
        <div className="Cards">
            <Space direction="horizontal">
                <Card>
                    <p>Total Income</p>
                    <Space>
                        {<DollarOutlined style={{ color: "green", fontSize: "50px", backgroundColor: "rgba(0,255,0,0.25)", borderRadius: 30, padding: 8 }} />}
                        <Statistic title="Daily" value="10,000" />
                    </Space>
                </Card>
                <Card>
                    <p>Total Income</p>
                    <Space>
                        {<DollarOutlined style={{ color: "blue", fontSize: "50px", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 30, padding: 8 }} />}
                        <Statistic title="Weekly" value="10,000" />
                    </Space>
                </Card>
                <Card>
                    <p>Total Income</p>
                    <Space>
                        {<DollarOutlined style={{ color: "red", fontSize: "50px", backgroundColor: "rgba(255,0,0,0.25)", borderRadius: 30, padding: 8 }} />}
                        <Statistic title="Monthly" value="10,000" />
                    </Space>
                </Card>
            </Space>
            <Space>
                <IncomeInfoTableJobPoster />
                <BarGraph />
            </Space>
        </div>
    );
}
export default Dashboard;

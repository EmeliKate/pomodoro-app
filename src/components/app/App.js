import styles from './App.module.scss';
import Dashboard from "../dashboard/Dashboard"
import Settings from "../settings/Settings"
import {ConfigProvider} from 'antd';
import {useSelector} from "react-redux";

const App = () => {

    const {appTheme} = useSelector( (store) => store.settings)

    return (
        <ConfigProvider
            theme={{
                token: appTheme
        }}
        >
            <div className={styles.app}>
                <Dashboard/>
                <Settings/>
            </div>
        </ConfigProvider>
    );
}

export default App;

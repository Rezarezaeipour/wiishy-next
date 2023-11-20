import { SpinLoading } from "antd-mobile";

function Loading() {
    return ( 
        <div className="w-full h-full flex items-center justify-center">
            <p>Loading...</p>
            <SpinLoading color="black" style={{ '--size': '32px' }} />
        </div>
     );
}

export default Loading;
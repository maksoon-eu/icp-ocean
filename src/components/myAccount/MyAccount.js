import { useState } from "react";
import MyBanner from "../myBanner/MyBanner";
import MyTabs from "../myTabs/MyTabs";

const MyAccount = () => {
    const [nftLength, setNftLength] = useState('...');
    const [collectionLength, setCollectionLength] = useState('...');

    return (
        <>
            <MyBanner nftLength={nftLength} collectionLength={collectionLength}/>
            <MyTabs setNftLength={setNftLength} setCollectionLength={setCollectionLength}/>
        </>
    );
};

export default MyAccount;
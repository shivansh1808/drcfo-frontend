import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import "./MyAccounts.css";
const MyAccounts = () => {
  const [accountList, setaccountList] = useState([]);

  return (
    <div className="my_accounts_page">
      <h1>My Accounts</h1>
      <div>
        {accountList.length ? (
          accountList.map((item, i) => <AccountCard item={item} key={i} />)
        ) : (
          <div className="accountCard_demo">
            <Skeleton animation="wave" width="100%" />
            <Skeleton animation="wave" width="100%" className="mt-3" />
          </div>
        )}
      </div>
    </div>
  );
};
const AccountCard = ({ item }) => {
  return (
    <div className="accountCard">
      <div>
        <p>Beneficiary Name: {item.benificiaryName}</p>
        <p>Bank Name: {item.bankName}</p>
        <p>IFSCCode: {item.IFSCCode}</p>
        <p>Bank Account Number: {item.bankAccountNumber}</p>
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};
export default MyAccounts;

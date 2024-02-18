export default function TableElements({ userInfo, isLoading }) {
  return (
    <div style={{ padding: "10px" }}>
      <h3>Table Data:</h3>
      {/* {isLoading ? <p>Loading...</p> : console.log(userInfo.location.children)} */}
      <table>
        <thead style={{ background: "#e4e8e6" }}>
          <tr>
            <th>Label</th>
            <th>Sample</th>
            <th>Amount</th>
            <th>Creation Date</th>
            <th>Status</th>
            <th>Expire Date</th>
            <th>Custome Fields</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            Array.isArray(userInfo.location.children) &&
            userInfo.location.children.map((index) => (
              <tr>
                <td>{index.label}</td>
                <td>{index.biosample.name}</td>
                <td>{index.biosample.quantity}</td>
                <td>{index.biosample.createDate}</td>
                <td>{index.biosample.status}</td>
                <td>{index.biosample.deleteDate}</td>
                <tr>
                  {index.biosample.customfields.map((index) => (
                    <td>{index.name}</td>
                  ))}
                </tr>
                <tr>
                  {index.biosample.customfields.map((index) => (
                    <td>{index.value}</td>
                  ))}
                </tr>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

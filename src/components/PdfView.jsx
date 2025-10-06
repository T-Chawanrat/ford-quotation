const PdfView = ({
  carData,
  todos,
  totalPayment,
  installment,
  interestRates,
  financedAmount,
}) => {
  return (
    <div id="pdf-view" className="w-[210mm] h-[500mm] mx-auto border">
      {/* Header */}
      <div className="p-4 flex justify-between items-center bg-[#1a448d] text-white">
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{carData.showroomName}</h1>
          <p className="text-sm text-white">
            {carData.consultantName} &nbsp;&nbsp;  {carData.consultantTel}
          </p>
        </div>
        <img
          className="h-16 mr-4"
          src="https://i.postimg.cc/wjY11wn7/Ford.png"
          alt="Ford Logo"
        />
      </div>

      {/* Title */}
      <div className="flex justify-center">
        <h2 className="text-2xl mt-10 font-semibold">ใบเสนอราคา</h2>
      </div>

      {/* Date */}
      <div className="p-6 text-right mr-8">
        วันที่{" "}
        {new Intl.DateTimeFormat("th-TH", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
        }).format(new Date())}
      </div>

      <div className="flex justify-between mx-36">
        {/* Car Information */}
        <div className="ml-8px-8">
          <h2 className="text-lg font-semibold underline">ข้อมูลรถ</h2>
          <p>รุ่น: {carData?.model}</p>
          <p>เกียร์: {carData?.gearbox}</p>
          <p>เครื่องยนต์: {carData?.engineSize}</p>
          <p>ค่าสี: {carData?.colorPremium?.toLocaleString()} บาท</p>
          <p className="text-red-600">
            ส่วนลดตัวรถ: {carData?.discount?.toLocaleString()} บาท
          </p>
          <p>
            เงินดาวน์:{" "}
            {carData?.downPaymentType === "%"
              ? `${carData?.downPayment}% = ${(
                  carData?.price *
                  (carData?.downPayment / 100)
                ).toLocaleString()} บาท`
              : `${carData?.downPayment?.toLocaleString()} บาท`}
          </p>
          <p>ยอดจัด: {financedAmount?.toLocaleString()} บาท</p>
          <p>ราคาสุทธิ: {carData?.price?.toLocaleString()} บาท</p>
        </div>

        {/* Customer Information */}
        <div>
          <h2 className="text-lg font-semibold underline">ข้อมูลลูกค้า</h2>
          <p>ชื่อ: {carData?.name}</p>
          <p>ที่อยู่: {carData?.address}</p>
          <p>เบอร์โทร: {carData?.tel}</p>
        </div>
      </div>

      {/* Installment Table */}
      <div className="flex justify-center mt-12">
        <table className="w-2/3 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-4 py-2 border">เดือน</th>
              <th className="px-4 py-2 border">ค่างวด</th>
              <th className="px-4 py-2 border">ดอกเบี้ย</th>
            </tr>
          </thead>
          <tbody>
            {[48, 60, 72, 84].map((month) => (
              <tr key={month}>
                <td className="px-2 py-2 border text-center">{month}</td>
                <td className="px-2 py-2 border text-center">
                  {installment[month]
                    ? `${installment[month].toLocaleString()} บาท`
                    : "-"}
                </td>
                <td className="px-2 py-2 border text-center">
                  {interestRates[month] ? `${interestRates[month]}%` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Freebies - Split into Two Columns */}
      <h2 className="mt-14 text-lg font-semibold underline flex justify-center">
        ของแถม
      </h2>
      <div className="justify-self-end mt-6">
        <ul className="grid grid-cols-3 gap-x-20 list-disc">
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>

      {/* Summary */}

      <div className="mt-14 px-10">
        <h2 className="text-lg font-semibold underline mx-10 mb-8 flex justify-center">
          สรุปค่าใช้จ่าย
        </h2>
        <p className="flex justify-between mx-10">
          เงินดาวน์:{" "}
          <span>
            {carData?.downPaymentType === "%"
              ? `${carData?.downPayment}% = ${(
                  carData?.price *
                  (carData?.downPayment / 100)
                ).toLocaleString()} บาท`
              : `${carData?.downPayment?.toLocaleString()} บาท`}
          </span>
        </p>
        <p className="text-red-600 flex justify-between mx-10">
          ส่วนลดเงินดาวน์:{" "}
          <span>{carData?.downDiscount?.toLocaleString()} บาท</span>
        </p>
        <p className="flex justify-between mx-10">
          Vat: <span>{carData?.vat?.toLocaleString()} บาท</span>
        </p>
        <p className="flex justify-between mx-10">
          ค่าจดทะเบียน:{" "}
          <span>{carData?.registrationFee?.toLocaleString()} บาท</span>
        </p>
        <p className="flex justify-between mx-10">
          ค่ามัดจำป้ายแดง:{" "}
          <span>{carData?.plateDeposit?.toLocaleString()} บาท</span>
        </p>
        <p className="flex justify-between mx-10">
          ค่างวดล่วงหน้า:{" "}
          <span>{carData?.prepaidInstallment?.toLocaleString()} บาท</span>
        </p>
        <p className="flex justify-between mx-10">
          ค่าใช้จ่ายอื่นๆ:{" "}
          <span>{carData?.otherExpenses?.toLocaleString()} บาท</span>
        </p>
        <p className="text-red-600 flex justify-between mx-10">
          - เงินจอง:{" "}
          <span>{carData?.reservationFee?.toLocaleString()} บาท</span>
        </p>
        <p className="text-lg font-medium mt-3 text-right mx-10 p-8  ">
          รวมยอดชำระ: <span>{totalPayment?.toLocaleString()} บาท</span>
        </p>
      </div>
    </div>
  );
};

export default PdfView;

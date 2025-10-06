import { useState, useEffect } from "react";
import "../App.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PdfView from "./PdfView";
import VisitCounter from "./VisitCounter";

const carModels = [
  {
    model: "RAS XL+ 2.0L Turbo HR 6MT",
    gearbox: "MT",
    engineSize: "2.0L",
    price: 734000,
  },
  {
    model: "RAS XLS 2.0L Turbo HR 6AT",
    gearbox: "AT",
    engineSize: "2.0L",
    price: 814000,
  },
  {
    model: "SWB 2.0L Bi-Turbo 4x4 10AT",
    gearbox: "AT",
    engineSize: "2.0L",
    price: 919000,
  },
  {
    model: "STD XL 2.0L Turbo 4x4 6MT",
    gearbox: "MT",
    engineSize: "2.0L",
    price: 732000,
  },
  {
    model: "DBL XL 2.0L Turbo LR 5MT",
    gearbox: "MT",
    engineSize: "2.0L",
    price: 767000,
  },
  {
    model: "DBL XL+ 2.0L Turbo HR 6MT",
    gearbox: "MT",
    engineSize: "2.0L",
    price: 837000,
  },
  {
    model: "DBL XLS 2.0L Turbo HR 6AT",
    gearbox: "AT",
    engineSize: "2.0L",
    price: 924000,
  },
  {
    model: "DBL Sport 2.0L Turbo HR 6AT",
    gearbox: "AT",
    engineSize: "2.0L",
    price: 999000,
  },
  {
    model: "DBL Sport 2.0L Turbo 4x4 6AT",
    gearbox: "AT",
    engineSize: "2.0L",
    price: 1089000,
  },
  {
    model: "DBL Wildtrak 2.0L Turbo HR 6MT",
    gearbox: "MT",
    engineSize: "2.0L",
    price: 1044000,
  },
  {
    model: "DBL Wildtrak 2.0L Turbo HR 6AT",
    gearbox: "AT",
    engineSize: "2.0L",
    price: 1094000,
  },
  {
    model: "DBL Wildtrak 2.0L Bi-Turbo HR 10AT",
    gearbox: "AT",
    engineSize: "2.0L Bi-Turbo",
    price: 1204000,
  },
  {
    model: "DBL Wildtrak 2.0L Bi-Turbo 4x4 10AT",
    gearbox: "AT",
    engineSize: "2.0L Bi-Turbo",
    price: 1344000,
  },
  {
    model: "DBL Wildtrak 3.0L V6 4x4 10AT",
    gearbox: "AT",
    engineSize: "3.0L V6",
    price: 1534000,
  },
  {
    model: "DBL Stormtrak 2.0L Bi-Turbo HR 10AT",
    gearbox: "AT",
    engineSize: "2.0L Bi-Turbo",
    price: 1294000,
  },
  {
    model: "DBL Stormtrak 2.0L Bi-Turbo 4x4 10AT",
    gearbox: "AT",
    engineSize: "2.0L Bi-Turbo",
    price: 1429000,
  },
  {
    model: "DBL Raptor 2.0L 4WD 10AT",
    gearbox: "AT",
    engineSize: "2.0L Bi-Turbo",
    price: 1804000,
  },
  {
    model: "DBL Raptor 3.0L V6 4WD 10AT",
    gearbox: "AT",
    engineSize: "3.0L V6",
    price: 1954000,
  },
  {
    model: "Everest 2.0L Turbo Trend 4x2 6AT",
    gearbox: "AT",
    engineSize: "2.0L Turbo",
    price: 1397000,
  },
  {
    model: "Everest 2.0L Turbo Sport 4x2 6AT",
    gearbox: "AT",
    engineSize: "2.0L Turbo",
    price: 1527000,
  },
  {
    model: "Everest 2.0L Turbo Sport 4x2 6AT-DAT64",
    gearbox: "AT",
    engineSize: "2.0L Turbo",
    price: 1585000,
  },
  {
    model: "Everest 2.0L Bi-Turbo Titanium+ 4x2 10AT",
    gearbox: "AT",
    engineSize: "2.0L Bi-Turbo",
    price: 1767000,
  },
  {
    model: "Everest 2.0L Bi-Turbo Titanium+ 4x4 10AT",
    gearbox: "AT",
    engineSize: "2.0L Bi-Turbo",
    price: 1917000,
  },
  {
    model: "Everest 2.0L Bi-Turbo Wildtrak 4x4 10AT",
    gearbox: "AT",
    engineSize: "2.0L Bi-Turbo",
    price: 1942000,
  },
  {
    model: "Everest 3.0L V6 Platinum 4x4 10AT",
    gearbox: "AT",
    engineSize: "3.0L V6",
    price: 2284000,
  },
];

const options = [
  "ประกันชั้น 1",
  "พ.ร.บ.",
  "ฟิล์ม",
  "กรอบป้าย",
  "ผ้ายางเข้ารูป",
  "กระบะไลน์เนอร์",
  "เบาะแคป",
  "ล้างขัดเคลือบสี",
  "น้ำมันส่งมอบ 10 ลิตร",
  "ชุดอุปกรณ์แม่แรง",
  "ส่วนลดค่าอะไหล่",
  "บริการช่วยเหลือ 24 ชม.",
  "รับประกันแบตเตอรี่ 1 ปี",
  "ฟรีค่าแรงเช็คระยะ",
  "รับประกัน 5 ปี 150,000 กิโล",
];

const CarTable = () => {
  const [selectedCarModel, setSelectedCarModel] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [price, setPrice] = useState(0);
  const [downPayment, setDownPayment] = useState("");
  const [downPaymentType, setDownPaymentType] = useState("%");
  const [colorPremium, setColorPremium] = useState("");
  const [discount, setDiscount] = useState("");
  const [todos, setTodos] = useState([
    "ประกันชั้น 1",
    "พ.ร.บ.",
    "ฟิล์มเซรามิค",
    "กรอบป้าย",
    "ผ้ายางเข้ารูป",
    "ล้างขัดเคลือบสี",
    "น้ำมัน 1,000",
    "บริการช่วยเหลือ 24 ชม.",
    "ฟรีค่าแรงเช็คระยะ",
    "รับประกัน 5 ปี 150,000 กิโล",
  ]);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState("");
  const [downDiscount, setDownDiscount] = useState("");
  const [registrationFee, setRegistrationFee] = useState("");
  const [plateDeposit, setPlateDeposit] = useState("");
  const [otherExpenses, setOtherExpenses] = useState("");
  const [reservationFee, setReservationFee] = useState("");
  const [vat, setVat] = useState("");
  const [prepaidInstallment, setPrepaidInstallment] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [showroomName, setShowroomName] = useState("");
  const [consultantName, setConsultantName] = useState("");
  const [consultantTel, setConsultantTel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [interestRates, setInterestRates] = useState({
    48: "",
    60: "",
    72: "",
    84: "",
  });

  const [installment, setInstallment] = useState({
    48: 0,
    60: 0,
    72: 0,
    84: 0,
  });

  const generatePdf = () => {
    const requiredFields = [
      showroomName,
      consultantName,
      consultantTel,
      name,
      address,
      tel,
      selectedCarModel,
      downPayment,
      downPaymentType,
    ];

    if (requiredFields.some((field) => field === "" || field === null)) {
      setErrorMessage("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    setErrorMessage(""); // ลบข้อความเตือนออกถ้าครบ

    const input = document.getElementById("pdf-view"); // ใช้ ID ของ PdfView
    html2canvas(input, { useCORS: true, scale: 1 }) // scale: 2 เพื่อเพิ่มความคมชัด
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", [210, 400]); // A4 size
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("quotation.pdf");
      }, 2000);
  };

  const carData = {
    model: selectedCarModel,
    gearbox: gearbox,
    engineSize: engineSize,
    price: price,
    name: name,
    address: address,
    tel: tel,
    downPayment: downPayment,
    downPaymentType: downPaymentType,
    colorPremium: colorPremium,
    discount: discount,
    registrationFee: registrationFee,
    plateDeposit: plateDeposit,
    otherExpenses: otherExpenses,
    reservationFee: reservationFee,
    downDiscount: downDiscount,
    installment: installment,
    vat: vat,
    prepaidInstallment: prepaidInstallment,
    consultantName: consultantName,
    consultantTel: consultantTel,
    showroomName: showroomName,
  };

  useEffect(() => {
    calculatePrice();
  }, [selectedCarModel, colorPremium, discount]);

  useEffect(() => {
    handleInstallmentCalculation();
  }, [interestRates, downPayment, price, downPaymentType]);

  const calculatePrice = () => {
    const car = carModels.find((c) => c.model === selectedCarModel);
    if (car) {
      const calculatedPrice =
        car.price + Number(colorPremium) - Number(discount);
      setPrice(Math.max(calculatedPrice, 0)); // ถ้าผลลัพธ์ < 0 จะเป็น 0
    }
  };

  const handleDownPaymentChange = (e) => {
    const value = parseFloat(e.target.value); // แปลงค่าเป็นตัวเลข
    if (!isNaN(value)) {
      if (downPaymentType === "%") {
        if (value >= 0 && value <= 100) {
          setDownPayment(value);
        }
      } else if (downPaymentType === "money") {
        if (value >= 0 && value <= price) {
          setDownPayment(value);
        } else {
          setDownPayment(price); // ถ้ามากกว่า price ให้ตั้งค่าเป็น price
        }
      }
    } else {
      setDownPayment(0); // ตั้งค่าเริ่มต้นเป็น 0 หากป้อนค่าไม่ถูกต้อง
    }
  };

  const handleDownPaymentTypeChange = (e) => {
    const newType = e.target.value;
    setDownPaymentType(newType);
    setDownPayment(0); // รีเซ็ตค่า downPayment เมื่อเปลี่ยนประเภท
  };

  const handleCarModelChange = (event) => {
    const selectedModel = event.target.value;
    setSelectedCarModel(selectedModel);

    const car = carModels.find((car) => car.model === selectedModel);
    if (car) {
      setGearbox(car.gearbox);
      setEngineSize(car.engineSize);
      setDownPayment(0); // รีเซ็ตค่า downPayment
      setInstallment({ 48: 0, 60: 0, 72: 0, 84: 0 });
      setColorPremium(0); // รีเซ็ตค่าสี
      setDiscount(0); // รีเซ็ตส่วนลด
    }
  };

  const handleColorPremium = (event) => {
    let value = Number(event.target.value);
    if (value > 30000) {
      value = 30000;
    }
    setColorPremium(value);
  };

  const handleDiscount = (event) => {
    let value = Number(event.target.value);

    if (value >= 0 && value <= Number(price)) {
      setDiscount(Math.min(value, 300000)); // จำกัดสูงสุด 500000
    } else {
      setDiscount(Math.min(Number(price), 300000));
    }
  };

  const calculateFinancedAmount = () => {
    if (!price) return 0;
    return downPaymentType === "%"
      ? price - (price * parseFloat(downPayment)) / 100
      : price - parseFloat(downPayment);
  };

  const financedAmount = calculateFinancedAmount();

  const handleInterestRateChange = (e, month) => {
    let value = parseFloat(e.target.value);

    // ถ้าไม่ใช่ตัวเลขให้เป็น 0
    if (isNaN(value)) value = 0;

    // จำกัดค่ามากสุดไม่เกิน 20%
    value = Math.min(value, 10);

    setInterestRates((prev) => ({
      ...prev,
      [month]: value,
    }));
  };

  const handleInstallmentCalculation = () => {
    const months = [48, 60, 72, 84]; // จำนวนงวด (เดือน)
    const calculatedInstallment = {};

    // คำนวณเงินดาวน์
    const downPaymentAmount =
      downPaymentType === "%"
        ? price * (downPayment / 100) // คำนวณจากเปอร์เซ็นต์
        : downPayment; // คำนวณจากจำนวนเงิน

    // เงินต้น = ราคารถ - เงินดาวน์
    const principal = price - downPaymentAmount;

    months.forEach((month) => {
      // อัตราดอกเบี้ยต่อเดือน
      const rate = parseFloat(interestRates[month]) / 100 / 12;

      // คำนวณค่างวด
      const installmentAmount = principal / month + principal * rate;

      // ปัดขึ้นเป็นจำนวนเต็ม
      calculatedInstallment[month] = Math.ceil(installmentAmount);
    });

    setInstallment(calculatedInstallment);
  };

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput("");
    } else if (selected && !todos.includes(selected)) {
      setTodos([...todos, selected]);
      setSelected("");
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const calculateTotalPayment = () => {
    const downPaymentAmount =
      downPaymentType === "%"
        ? price * (downPayment / 100) // คำนวณจากเปอร์เซ็นต์
        : downPayment; // คำนวณจากจำนวนเงิน

    const validatedDownDiscount = Math.min(
      Number(downDiscount),
      Number(downPaymentAmount)
    ); // แปลงเป็นตัวเลข

    const totalPayment =
      downPaymentAmount -
      validatedDownDiscount +
      Number(vat) +
      Number(registrationFee) +
      Number(plateDeposit) +
      Number(prepaidInstallment) +
      Number(otherExpenses) -
      Number(reservationFee);

    return totalPayment;
  };

  return (
    <div id="quotation" className="max-w-4xl mx-auto bg-white">
      <div className="p-4 flex justify-between items-center bg-[#1a448d] flex-wrap">
        <div>
          <h1 className="text-2xl font-bold max-sm:text-2xl  text-white">
            Ford Quotation
          </h1>
          <p className="text-sm max-sm:text-sm text-white">
            Developed for personal use.
          </p>
        </div>

        <img
          className="h-16 max-sm:h-8"
          src="https://img5.pic.in.th/file/secure-sv1/ffff83ef44457c5bd2.png"
          alt=""
        />
      </div>

      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-left p-6">ใบเสนอราคา</h2>
        <div className="p-6 text-right">
          วันที่{" "}
          {new Intl.DateTimeFormat("th-TH", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          }).format(new Date())}
        </div>
      </div>
      <div className="flex justify-between -mt-4">
        <div className="p-6 w-1/2 text-sm">
          <input
            type="text"
            className={`w-full p-1 mb-1 rounded-md ${
              name ? "input-filled" : "input-empty"
            }`}
            placeholder="ชื่อโชว์รูม"
            value={showroomName}
            onChange={(e) => setShowroomName(e.target.value)}
          />
          <input
            type="text"
            className={`w-full p-1 mb-1 rounded-md ${
              name ? "input-filled" : "input-empty"
            }`}
            placeholder="ชื่อที่ปรึกษาการขาย"
            value={consultantName}
            onChange={(e) => setConsultantName(e.target.value)}
          />
          <input
            type="tel"
            className={`w-full p-1 mb-1 rounded-md ${
              consultantTel ? "input-filled" : "input-empty"
            }`}
            placeholder="เบอร์โทรศัพท์ Sales"
            value={consultantTel}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length > 10) {
                value = value.slice(0, 10);
              }

              setConsultantTel(value);
            }}
          />
        </div>

        <div className="p-6  w-1/2 text-sm">
          <input
            type="text"
            className={`w-full p-1 mb-1 rounded-md ${
              name ? "input-filled" : "input-empty"
            }`}
            placeholder="ชื่อ-นามสกุล ลูกค้า"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className={`w-full p-1 mb-1 rounded-md ${
              address ? "input-filled" : "input-empty"
            }`}
            placeholder="ที่อยู่ลูกค้า"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="tel"
            className={`w-full p-1 mb-1 rounded-md ${
              tel ? "input-filled" : "input-empty"
            }`}
            placeholder="เบอร์โทรศัพท์ลูกค้า"
            value={tel}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length > 10) {
                value = value.slice(0, 10);
              }

              setTel(value);
            }}
          />
        </div>
      </div>

      <div>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            <tr>
              <td className="p-2 w-1/4 border bg-blue-900 text-white font-medium">
                รุ่นรถ
              </td>
              <td className="p-2 border">
                <select
                  className="w-full border border-gray-300 rounded-md"
                  value={selectedCarModel}
                  onChange={handleCarModelChange}
                >
                  <option value="">เลือกรุ่นรถ</option>
                  {carModels.map((car, index) => (
                    <option key={index} value={car.model}>
                      {car.model}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border-collapse border border-gray-300 text-sm table-layout-fixed">
          <tbody>
            <tr className="w-full">
              <td className="p-2 border bg-blue-900 text-white font-medium w-1/4">
                เกียร์
              </td>
              <td className="p-2 border text-center w-1/4">{gearbox}</td>
              <td className="p-2 border bg-blue-900 text-white font-medium w-1/4">
                เครื่องยนต์
              </td>
              <td className="p-2 border text-center w-1/4">{engineSize}</td>
            </tr>

            <tr>
              <td className="p-2 border bg-blue-900 text-white font-medium w-1/4">
                ค่าสี
              </td>
              <td className="p-2 border text-center w-1/4">
                <input
                  className={`w-full p-1 h-6 border border-gray-300 rounded-md ${
                    colorPremium ? "input-filled" : "input-empty"
                  }`}
                  value={colorPremium}
                  onChange={handleColorPremium}
                  type="number"
                />
              </td>
              <td className="p-2 border bg-blue-900 text-white font-medium w-1/4">
                ส่วนลด
              </td>
              <td className="p-1 border text-center w-1/4">
                <input
                  className={`w-full h-6 border border-gray-300 rounded-md text-red-600 ${
                    discount ? "input-filled" : "input-empty"
                  }`}
                  value={discount}
                  onChange={handleDiscount}
                  type="number"
                  max={price}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="max-w-4xl mx-auto bg-white">
        <table className="w-full border-collapse  border-gray-300 text-sm">
          <tbody>
            <tr>
              <td className="p-2 w-1/4 border bg-blue-900 font-medium text-white whitespace-nowrap">
                เงินดาวน์
              </td>
              <td className="p-2 space-x-2">
                <input
                  type="number"
                  value={downPayment}
                  onChange={handleDownPaymentChange}
                  min={downPaymentType === "%" ? 0 : undefined} // จำกัดค่าต่ำสุดเมื่อเลือก "%"
                  max={downPaymentType === "%" ? 100 : undefined} // จำกัดค่าสูงสุดเมื่อเลือก "%"
                  className="w-1/2 h-6 p-1 border border-gray-300 rounded-md"
                  placeholder={downPaymentType === "%" ? "%" : "จำนวนเงิน"}
                />
                <select
                  className="h-6 border border-gray-300 rounded-md"
                  value={downPaymentType}
                  onChange={handleDownPaymentTypeChange} // ใช้ฟังก์ชันใหม่
                >
                  <option value="%">%</option>
                  <option value="money">บาท</option>
                </select>
              </td>
              <td className="text-right px-6">
                =&nbsp;&nbsp;&nbsp;
                {downPaymentType === "%"
                  ? (price * (parseFloat(downPayment) / 100)).toLocaleString()
                  : downPayment.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="max-w-4xl mx-auto bg-white overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr>
              <td className="p-2 w-1/4 border bg-blue-900 font-medium text-white whitespace-nowrap">
                ราคา
              </td>
              <td className="p-2 w-1/4 border text-sm sm:text-xl font-semibold whitespace-nowrap">
                {price ? price.toLocaleString() : ""}
              </td>
              <td className="p-2 w-1/4 border bg-blue-900 font-medium text-white whitespace-nowrap">
                ยอดจัด
              </td>
              <td className="p-2 w-1/4 border text-sm sm:text-l font-medium  whitespace-nowrap">
                {price
                  ? downPaymentType === "%"
                    ? (
                        price -
                        (price * parseFloat(downPayment)) / 100
                      ).toLocaleString()
                    : (price - parseFloat(downPayment)).toLocaleString()
                  : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="py-2 border font-medium">เดือน</th>
              <th className="px-4 py-2 border font-medium">ค่างวด</th>
              <th className="px-4 py-2 border font-medium">ดอกเบี้ย</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[48, 60, 72, 84].map((month) => (
              <tr key={month}>
                <td className="px-4 py-2 border text-center">{month}</td>
                <td className="px-4 py-2 border text-center">
                  {installment[month]
                    ? `${installment[month].toLocaleString()}`
                    : "-"}
                </td>
                <td className="w-1/4 px-4 py-2 border text-right">
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={interestRates[month] || ""}
                    onChange={(e) => handleInterestRateChange(e, month)}
                    className={`w-full p-1 border border-gray-300 rounded-md ${
                      interestRates[month] ? "input-filled" : "input-empty"
                    }`}
                    placeholder="Rate %"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Freebies Section */}
      <div className="">
        <h2 className="text-lg font-semibold">ของแถม</h2>

        <ul className="mt-2 mb-2 text-sm">
          {todos.map((todo, index) => (
            <li key={index} className="flex justify-between items-center  py-1">
              {todo}
              <button
                className="text-red-600"
                onClick={() => deleteTodo(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>

        {/* Select Box */}
        <div className="mb-4 text-sm">
          <select
            className="w-full p-1 border border-gray-300 rounded-md"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">-- เลือกรายการ --</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Input Box */}
        <div className="mt-4 mb-2 text-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTodo();
            }}
          >
            <input
              className="w-full border border-gray-300 rounded-md px-2 py-1"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="เพิ่มรายการของแถม..."
            />
          </form>
        </div>

        {/* Add Button */}
        <button
          className="float-right px-2 py-1 bg-blue-900 text-white border border-gray-100 rounded-md text-sm"
          onClick={addTodo}
        >
          เพิ่ม
        </button>
      </div>

      <div className="mt-14">
        <h2 className="text-lg font-semibold mb-4">สรุปค่าใช้จ่าย</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm font-medium">
          <tbody>
            <tr>
              <td className="p-2 border bg-blue-900 text-white">เงินดาวน์</td>
              <td className="p-2 border text-right px-6">
                {downPaymentType === "%"
                  ? (price * (downPayment / 100)).toLocaleString()
                  : downPayment.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="p-2 border bg-blue-900 text-white">
                ส่วนลดเงินดาวน์
              </td>
              <td className="p-2 border text-right">
                <input
                  type="number"
                  min={0}
                  value={downDiscount}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    const downPaymentAmount =
                      downPaymentType === "%"
                        ? price * (downPayment / 100) // คำนวณจากเปอร์เซ็นต์
                        : downPayment; // คำนวณจากจำนวนเงิน

                    // ตรวจสอบว่า downDiscount ไม่เกิน downPaymentAmount
                    if (value <= downPaymentAmount) {
                      setDownDiscount(value); // ถ้าไม่เกินให้ตั้งค่า
                    } else {
                      setDownDiscount(downPaymentAmount); // ถ้ามากกว่าให้ตั้งค่าเป็น downPaymentAmount
                    }
                  }}
                  className="w-full border border-gray-300  rounded-md text-right "
                ></input>
              </td>
            </tr>
            <tr>
              <td className="p-2 border bg-blue-900 text-white">Vat</td>
              <td className="p-2 border text-right">
                <input
                  type="number"
                  min={0}
                  value={vat}
                  onChange={(e) => {
                    let value = parseFloat(e.target.value) || 0;
                    value = Math.min(value, 100000); // จำกัดไม่เกิน 100000
                    setVat(value);
                  }}
                  className="w-full  border border-gray-300 rounded-md text-right"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 border bg-blue-900 text-white">
                ค่าจดทะเบียน
              </td>
              <td className="p-2 border text-right">
                <input
                  type="number"
                  min={0}
                  value={registrationFee}
                  onChange={(e) => {
                    let value = parseFloat(e.target.value) || 0;
                    value = Math.min(value, 20000); // จำกัดไม่เกิน 20000
                    setRegistrationFee(value);
                  }}
                  className="w-full border border-gray-300 rounded-md text-right"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 border bg-blue-900 text-white">
                มัดจำป้ายแดง
              </td>
              <td className="p-2 border text-right">
                <input
                  type="number"
                  min={0}
                  value={plateDeposit}
                  onChange={(e) => {
                    let value = parseFloat(e.target.value) || 0;
                    value = Math.min(value, 20000); // จำกัดไม่เกิน 20000
                    setPlateDeposit(value);
                  }}
                  className="w-full border border-gray-300 rounded-md text-right"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 border bg-blue-900 text-white">
                ค่างวดล่วงหน้า
              </td>
              <td className="p-2 border text-right">
                <input
                  type="number"
                  min={0}
                  value={prepaidInstallment}
                  onChange={(e) => {
                    let value = parseFloat(e.target.value) || 0;
                    value = Math.min(value, 100000); // จำกัดไม่เกิน 100000
                    setPrepaidInstallment(value);
                  }}
                  className="w-full border border-gray-300 rounded-md text-right"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 border bg-blue-900 text-white">
                ค่าใช้จ่ายอื่นๆ
              </td>
              <td className="p-2 border text-right">
                <input
                  type="number"
                  min={0}
                  value={otherExpenses}
                  onChange={(e) => {
                    let value = parseFloat(e.target.value) || 0;
                    value = Math.min(value, 100000); // จำกัดไม่เกิน 100000
                    setOtherExpenses(value);
                  }}
                  className="w-full border border-gray-300 rounded-md text-right"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 border bg-blue-900 text-white">เงินจอง</td>
              <td className="p-2 border text-right">
                <input
                  type="number"
                  min={0}
                  value={reservationFee}
                  onChange={(e) => {
                    let value = parseFloat(e.target.value) || 0;
                    value = Math.min(value, 30000); // จำกัดไม่เกิน 100000
                    setReservationFee(value);
                  }}
                  className="w-full  border border-gray-300 rounded-md text-right"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 border bg-blue-900 text-white">รวมยอดชำระ</td>
              <td className="p-2 border font-semibold text-right px-6 text-red-600">
                {calculateTotalPayment().toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <VisitCounter />
      <div className="text-center mt-4">
        <button
          onClick={generatePdf}
          className="px-4 py-2 bg-blue-900 text-white rounded-md text-sm"
        >
          ดาวน์โหลด PDF
        </button>
        {errorMessage && (
          <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
        )}
      </div>

      <div className="text-center mt-4 p-6 animate-bounce text-gray-600 text-sm">
        <p>Copyright@2025 Developed by T.CWR</p>
        <p>Line ID: ND113</p>
      </div>

      <PdfView
        carData={carData}
        todos={todos}
        totalPayment={calculateTotalPayment()}
        installment={installment}
        interestRates={interestRates}
        financedAmount={financedAmount}
      />
    </div>
  );
};

export default CarTable;

// const CarTable = () => {
//   return (
//     <div>
//         <p className="text-lg flex justify-center mt-40">
//         ปิดระบบ เนื่องจากนำพื้นที่ไปใช้ในงานประจำ
//       </p>
//     </div>
//   )
// }

// export default CarTable

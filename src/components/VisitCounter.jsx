import { useEffect, useState } from "react";
import axios from "axios";

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const fetchVisitData = async () => {
      try {
        const response = await axios.get("https://ford-count.onrender.com/visit-count");
        setVisitCount(response.data.count);
      } catch (error) {
        console.error("Error fetching visit count:", error);
      }

      try {
        await axios.get("https://ford-count.onrender.com/visit");
      } catch (error) {
        console.error("Error incrementing visit count:", error);
      }
    };

    fetchVisitData();
  }, []);

  return (
    <div>
      <p className="text-sm p-1">visit : {visitCount}</p>
    </div>
  );
};

export default VisitCounter;

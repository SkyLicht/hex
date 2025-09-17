import { LineDTO, PlatformDTO } from "@/src/dto/planner_dto"
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
        lines: LineDTO[]
        platforms: PlatformDTO[]
}


const UPHRecordForm = (props: Props) => {

    const [errors, setErrors] = useState<Record<string, string>>({});

    const[formValue, setFormValues] = useState({
                    platform_id: "",
            line_id: "",
            target_oee: "",
            uph: "",
            start_date: "",
            end_date: ""
    });

    const router = useRouter();


      const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  

    return <div>UPH Record Form</div>
}

export default UPHRecordForm

import { FunctionComponent } from "react";
import { trpc } from "~/utils/trpc";

interface dahboardProps {
    
}
 
const dahboard: FunctionComponent<dahboardProps> = () => {


    const{mutate}=trpc.admin.sensitive.useMutation()
    return ( <div>Dashboard<button onClick={()=>mutate()}>Topic secret</button></div> );
}
 
export default dahboard;
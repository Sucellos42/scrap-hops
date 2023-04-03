import Cell from "@/components/cell";

export function Tbody ({ data }) {
  
  
  return (
    <tbody>
    {Object.entries(data).map(([hopName, content]) => {
      return (
        <tr key={hopName}>
        
        </tr>
      )
    })}
    </tbody>
  )
}

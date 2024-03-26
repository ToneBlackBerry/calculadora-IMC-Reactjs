import React, { useState } from "react"
import Button from "./Componentes/Button"
import Input from "./Componentes/Input"
import Label from "./Componentes/Label"
import ReferenceTable from "./ReferenceTable"
import { IMCResult, calculateIMC } from "./lib/IMC"
//import { formatNumber } from "./lib/utils"
import ResultsTable from "./Componentes/ResultsTable"

function App() {
  const [IMCData, setIMCData] = useState<null | {weight:number, height:number, IMC:number, IMCResult:string;}>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    // get data from form
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as {weight:string, height:string}


    // handel empty fields 
    const { weight, height} = data;
    if(!weight || !height) {
        alert('Você precisa preencher todos os campos')
      return;
    }
    console.log(data)
    //parse and handle string to number
    const weightNumber = parseFloat(weight.replace(',', '.'))
    const heightNumber = parseFloat(height.replace(',', '.')) /100;
    
    if (isNaN(weightNumber) || isNaN(heightNumber)) {
      
        alert('Você precisa preencher os campos com números válidos')
        return 
    }
    
    //handel invalid number
    if (weightNumber < 2 || weightNumber > 500) {
      alert('O peso precisa ser maior que 2kg e menor que 500kg')
    }
    if (heightNumber < 0.5 || heightNumber > 2.5) {
      alert('A altura precisa ser maior que 50cm e menor que 2,5m')
    }

    //calculate imc
    const IMC = calculateIMC(weightNumber, heightNumber)
    const IMCResultString = IMCResult(IMC)
    console.log(IMC)
    console.log(IMCResultString)
    //set result
    setIMCData({
      weight: weightNumber,
      height: heightNumber,
      IMC: IMC,
      IMCResult: IMCResultString
    })

    //clear form
    e.currentTarget.reset()
  }
  function handleClickReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setIMCData(null)
  }

  return (
   <main className="bg-white max-w-4xl mx-auto md:py-24 md:px-48 px-5 py-10">
      <section id="form">
      <form onSubmit={handleSubmit}>
        <div>
        <Label htmlFor="weigth"> Peso(Kg)</Label>
        <Input disabled={!!IMCData} name="weight" className="mt-2" type="text" id="weight"/> 
      </div>
      <div className="mt-4">
        <Label htmlFor="height">Altura (cm)</Label>
        <Input disabled={!!IMCData} name="height" className="mt-2" type="text" id="height"/> 
      </div>
      {IMCData ? (
        <Button onClick={handleClickReset} type="button">Refazer</Button>
      ) : (
        <Button type="submit">Calcular</Button>
      )}
      </form>
      </section>
      <section id="result" className="py-10 px-4 h-40">
        {IMCData ? (
          <ResultsTable IMCData={IMCData}/>
        ): (
          <p className="text-center text-neutral-400 text-xl">Saiba agora se está no seu peso ideal</p>

        )}
      </section>
      <section id="reference-table">
      <ReferenceTable/>
      </section>
   </main>
  )
}

export default App

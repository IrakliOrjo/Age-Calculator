import FormInput from "./components/FormInput"
import icon from './assets/icon-arrow.svg'
import { useState } from "react"
import CountUp from 'react-countup';

const inputs = [
  {
    id:1,
    name:'day',
    type:'text',
    placeholder: "DD",
    errorMessage: "Must be a valid day",
    label:"Days"
  },
   {
    id:2,
    name:'month',
    type:'text',
    placeholder: "MM",
    errorMessage: "Must be a valid month",
    label:"Months"
  },
   {
    id:3,
    name:'year',
    type:'text',
    placeholder: "YYYY",
    errorMessage: "Must be in the past",
    label:"Years"
  }
]


function App() {

  const [date, setDate] = useState({year: '', month: '', day:''})
  const [age,setAge] = useState({year: '', month: '', day:''})
  const [error,setError] = useState({
    year:false,
    month:false,
    day: false
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setDate(prevDate => ({
      ...prevDate,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { year, month, day} = date
    const inputDate = new Date(`${year}-${month}-${day}`)
    const currentDate = new Date()
    const daysInMonth = new Date(year,month,0).getDate()

    let isValid = true;

    if(isNaN(parseInt(day)) || parseInt(day) < 1 || parseInt(day) > daysInMonth){
      isValid = false
      console.log(day)
      setError(prevError => ({...prevError, day:true}))
    }else{
      setError(prevError => ({...prevError, day:false}))
    }


    if(inputDate > currentDate || isNaN(parseInt(year))){
      isValid = false
      setError(prevError => ({...prevError, year:true}))
    }else{
      setError(prevError => ({...prevError, year:false}))
    }

    if(inputDate.getMonth() + 1 !== parseInt(month) || isNaN(parseInt(month))){
      isValid = false
      setError(prevError => ({...prevError, month:true}))
    }else{
      setError(prevError => ({...prevError, month:false}))
    }

    if(!error.day && !error.year && !error.month && isValid){
      let ageYears = currentDate.getFullYear() - inputDate.getFullYear()
      let ageMonths = currentDate.getMonth() - inputDate.getMonth()
      let ageDays = currentDate.getDate() - inputDate.getDate()

      if(ageMonths < 0 || (ageMonths === 0 && ageDays < 0)){
        ageYears--
        ageMonths+=12
      }
      if(ageDays < 0) {
        ageMonths--
        ageDays += new Date(currentDate.getFullYear(), currentDate.getMonth(),0).getDate()
      }
      setError({year:false,month:false,day:false})
      setAge({
        year:ageYears,
        month:ageMonths,
        day: ageDays
      })

    }

  }

 
  return (
    <div className="min-h-screen overflow-hidden bg-gray-300 items-center flex
    flex-col mx-auto p-11 md:justify-center">
      <div className="bg-white w-full max-w-[50rem] flex flex-col items-center 
       justify-center rounded-lg p-7 md:rounded-br-[15rem]">
        <form 
        onSubmit={handleSubmit}
        className="flex flex-col w-full">
          <div className="flex gap-6 mb-11 md:gap-8 md:mb-4">
            {inputs.map((input) => {
              return (<FormInput label={input.label} error={error} date={date}
                name={input.name} handleChange={handleChange} 
                errorMessage={input.errorMessage} placeholder={input.placeholder} />)
            })}
          </div>
      <div className="relative flex justify-center w-full md:justify-end">
        <button className="bg-purple hover:bg-purple/80 flex justify-center
         items-center w-16 h-16 rounded-full z-10 md:w-20 md:h-20">
          <img 
          className="w-8"
          src={icon} alt='arrow icon' />
        </button>
        <div className="w-full border h-0 absolute top-[50%]"></div>
      </div>
        </form>
        <div className="mt-11 self-start md:mt-2">
          <p className="transition-all italic ease-in font-bold duration-500 text-[3.8rem]
          md:text-[6rem]">
            <CountUp 
            className={`text-purple ${!age.year ? 'hidden' : 'inline'}`}
            start={0} end={age.year}></CountUp>
            <span className={`text-purple ${!age.day ? 'inline' : 'hidden'}`}
            >--</span> years</p>
          <p 
          className="transition-all italic ease-in font-bold duration-500 text-[3.8rem]
          md:text-[6rem]"
          >
            <CountUp 
            className={`text-purple ${!age.year ? 'hidden' : 'inline'}`}
            start={0} end={age.month}></CountUp>
            <span className={`text-purple ${!age.day ? 'inline' : 'hidden'}`}
            >--</span> months</p>
          <p
          className="transition-all italic ease-in font-bold duration-500 text-[3.8rem]
          md:text-[6rem]">
            <CountUp
            className={`text-purple ${!age.year ? 'hidden' : 'inline'}`}
            start={0} end={age.day}></CountUp>
            <span className={`text-purple ${!age.day ? 'inline' : 'hidden'}`}
            >--</span> days</p>
        </div>
      </div>
    </div>
  )
}

export default App

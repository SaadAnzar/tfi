'use client'

import LoadingDots from '@/components/LoadingDots'
import Output from '@/components/Output'
import UserNav from '@/components/UserNav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

import {
  educationdetail,
  workexperience,
  otherexperience,
  courageessay,
  clessay,
  purposeessay,
} from '@/lib/data'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const HomePage = () => {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const [editBtn, setEditBtn] = useState(false)

  const [generatedAOSummary, setGeneratedAOSummary] = useState<String>('')
  const [generatedAOQuestions, setGeneratedAOQuestions] = useState<String>('')
  const [generatedCourageSummary, setGeneratedCourageSummary] =
    useState<String>('')
  const [generatedCourageQuestions, setGeneratedCourageQuestions] =
    useState<String>('')
  const [generatedCLSummary, setGeneratedCLSummary] = useState<String>('')
  const [generatedCLQuestions, setGeneratedCLQuestions] = useState<String>('')
  const [generatedPurposeSummary, setGeneratedPurposeSummary] =
    useState<String>('')
  const [generatedPurposeQuestions, setGeneratedPurposeQuestions] =
    useState<String>('')

  const [generatedWriting, setGeneratedWriting] = useState<String>('')

  const [educationDetails, setEducationDetails] = useState('')
  const [workExDetails, setWorkExDetails] = useState('')
  const [otherExperiences, setOtherExperiences] = useState('')
  const [courageEssay, setCourageEssay] = useState('')
  const [clEssay, setClEssay] = useState('')
  const [purposeEssay, setPurposeEssay] = useState('')

  // const [educationDetails, setEducationDetails] = useState(educationdetail)
  // const [workExDetails, setWorkExDetails] = useState(workexperience)
  // const [otherExperiences, setOtherExperiences] = useState(otherexperience)
  // const [courageEssay, setCourageEssay] = useState(courageessay)
  // const [clEssay, setClEssay] = useState(clessay)
  // const [purposeEssay, setPurposeEssay] = useState(purposeessay)

  const [currentMonth, setCurrentMonth] = useState<String>('November')
  const [currentYear, setCurrentYear] = useState<number>(2023)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const [download, setDownload] = useState(false)

  const [summaryDone, setSummaryDone] = useState(false)

  const [userPic, setUserPic] = useState<string>('')
  const [userDisplayName, setUserDisplayName] = useState<String>('')
  const [userEmail, setUserEmail] = useState<String>('')
  const [nameInitials, setNameInitials] = useState<String>('')

  const [pageLoading, setPageLoading] = useState<boolean>(true)

  useEffect(() => {
    const currentDate = new Date()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()

    const monthName = monthNames[month]

    setCurrentMonth(monthName)
    setCurrentYear(year)
  }, [])

  useEffect(() => {
    const userJSON = localStorage.getItem('users')

    const check = Cookies.get('isLoggedIn')

    let user
    if (check == 'true' && userJSON) {
      setPageLoading(false)

      user = JSON.parse(userJSON)
      setUserPic(user.photoURL)
      setUserDisplayName(user.displayName)
      setUserEmail(user.email)

      const words = user.displayName.split(' ')

      const initials = words.map((word: String) => word.charAt(0)).join('')

      setNameInitials(initials)
    } else {
      router.push('/login')
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    Cookies.set('isLoggedIn', 'false')

    router.push('/login')
  }

  const checkInput = () => {
    // Create an array of input fields to check
    const inputFields = [
      educationDetails,
      workExDetails,
      otherExperiences,
      courageEssay,
      clEssay,
      purposeEssay,
    ]

    // Check each input field for blank values
    for (const inputField of inputFields) {
      if (!inputField.trim()) {
        // Show a notification for blank input fields
        toast.error('Please fill in all input fields.')
        return false // Stop checking and return false
      }
    }

    return true // All input fields are filled
  }

  function generatePrompts() {
    if (!checkInput()) {
      return // Don't proceed if there are blank fields
    }

    setGeneratedAOSummary('')
    setGeneratedAOQuestions('')
    setGeneratedCourageSummary('')
    setGeneratedCourageQuestions('')
    setGeneratedCLSummary('')
    setGeneratedCLQuestions('')
    setGeneratedPurposeSummary('')
    setGeneratedPurposeQuestions('')

    generateAOSummary()
  }

  const handleReset = (e: any) => {
    e.preventDefault()

    // Reset all the input fields to their initial values
    setEducationDetails('')
    setWorkExDetails('')
    setOtherExperiences('')
    setCourageEssay('')
    setClEssay('')
    setPurposeEssay('')

    // Reset other state variables if needed
    setGeneratedAOSummary('')
    setGeneratedAOQuestions('')
    setGeneratedCourageSummary('')
    setGeneratedCourageQuestions('')
    setGeneratedCLSummary('')
    setGeneratedCLQuestions('')
    setGeneratedPurposeSummary('')
    setGeneratedPurposeQuestions('')

    // Display a success message
    toast.success('Form reset success!')
  }

  useEffect(() => {
    if (summaryDone) {
      generateAOQuestions(generatedAOSummary)
      generateCourageQuestions()
      generateCLQuestions()
      generatePurposeQuestions()
    }
  }, [summaryDone])

  const aoSummary = `
Education Section- " ${educationDetails} "
WorkEx Section- "  ${workExDetails}"
   
From the above given data give me extractive answers for the following questions. Keep the answers short. Give the answers in bullet points. Irrespective of the order of asking questions, give all the information in the correct chronological order. Do not add any new information. Only make use of information given above. If some information is not available say ""Not available"".

In which year did the applicant complete undergrad?
How much did they score?
In which year did the applicant complete postgrad?
How much did they score?
In which year did the applicant complete the additional degree?
How much did they score?

Is the applicant currently working? or Have they worked before?
Give an extractive summary in 5 sentences of the work trajectory in a chronological order. In the summary highlight the significant achievements, roles and responsibilities, and the times for the work experience.
Does the applicant have a gap in their work experience?  If so, when were they not working? Do they have any other achievements during the gap? Answer in 2 sentences.

Assume undergrad education takes 3 years and post grad degree and additional degree takes 2 years. Do not include Post grad degree, additional degree or undergraduate degree as a gap. You are in ${currentMonth} ${currentYear}, from the information given and the assumptions- identify in which years the applicant might not have been working or not pursuing any educational programs until November 2023. Give the answer as a range.

Do not include the questions in the generated output. Just give the output. Do not add any new information. Only make use of information given in the respective sections. If some information is not available say ""Not available"".
Make sure all the information is presented in the correct chronological order.`

  const generateAOSummary = async () => {
    setSummaryDone(false)
    setDownload(false)
    setEditBtn(false)
    setLoading(true)
    const response = await fetch('/api/ao-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ aoSummary }),
    })
    const data = response.body
    if (!data) {
      console.log('No data')
      return
    }
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedAOSummary((prev) => prev + chunkValue)
    }
    setLoading(false)
    toast.success('Generated AO Summary!')
    setEditBtn(true)
    setDownload(true)

    generateCourageSummary()
    generateCLSummary()
    generatePurposeSummary()
    generateWriting()
  }

  const generateAOQuestions = async (query: String) => {
    const aoQuestions = `
This is the summary of AO of the candidate: " ${query} "

Convert the score on the scale of 1-5 if not mentioned already.
Only generate these if the score is mentioned and is less than 3.

If UG Score is below 3, ask the following questions for each of the section relevant with relevant details included from the information provided above-
- Q1. I see on your application form that you are studying/were studying <course_name> at <college_name> and have scored <x%> so far. Is this correct?
- Q2. At the start of your degree you must've had some aspirations about what you wanted to achieve academically. What were these aspirations and did your achievements meet these aspirations?
- Q3. Do you know what your rank might be in your class? And how many students were studying in your class?
- Q4. What would you say your biggest achievements have been to date and why?

If PG Score is below 3, ask the following questions for each of the section relevant with relevant details included from the information provided above-
- Q1. I see on your application form that you are studying/were studying <course_name> at <college_name> and have scored <x%> so far. Is this correct?
- Q2. At the start of your degree you must've had some aspirations about what you wanted to achieve academically. What were these aspirations and did your achievements meet these aspirations?
- Q3. Do you know what your rank might be in your class? And how many students were studying in your class?
- Q4. What would you say your biggest achievements have been to date and why?

If AD Score is below 3, ask the following questions for each of the section relevant with relevant details included from the information provided above-
- Q1. I see on your application form that you are studying/were studying <course_name> at <college_name> and have scored <x%> so far. Is this correct?
- Q2. At the start of your degree you must've had some aspirations about what you wanted to achieve academically. What were these aspirations and did your achievements meet these aspirations?
- Q3. Do you know what your rank might be in your class? And how many students were studying in your class?
- Q4. What would you say your biggest achievements have been to date and why?

Only generate these if the score is mentioned and is less than 3.

Does the applicant have a gap? If so ask the following questions with relevant details included from the information provided above-
- I see on your application form that there was a gap between <mention where the gap is, and in case of multiple gaps in the last 4 years, mention only 2 gaps>. I would like to understand is there anything specific you were doing during this phase?

Does the applicant has work experience of more than 6 months? If so ask the following questions with relevant details included from the information provided above-

I see that you have been working as a <position name> in <organisation name> since/between <mention time period>.
Q1. I’d like to hear more about your role – what are/were your main responsibilities? How was your success measured by your manager (by which criteria)?
Q2. You have been in this role/held this role for # months – What is expected of you in this role, and have you met these expectations? What would you say your biggest achievements during this time have been/were?
Q3. What would you say your biggest achievements to date in your career have been?`

    setDownload(false)

    setEditBtn(false)
    setLoading(true)
    const response = await fetch('/api/ao-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ aoQuestions }),
    })
    const data = response.body
    if (!data) {
      console.log('No data')
      return
    }
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedAOQuestions((prev) => prev + chunkValue)
    }
    setLoading(false)
    toast.success('Generated AO Questions!')

    setEditBtn(true)
    setDownload(true)
  }

  //     e.preventDefault();
  // setEditBtn(false)
  //     const response = await fetch("/api/output", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ clprompt }),
  //     });
  //     const data = response.body;
  //     if (!data) {
  //       console.log("No data");
  //       return;
  //     }
  //     const reader = data.getReader();
  //     const decoder = new TextDecoder();
  //     let done = false;

  //     while (!done) {
  //       const { value, done: doneReading } = await reader.read();
  //       done = doneReading;
  //       const chunkValue = decoder.decode(value);
  //       setGeneratedOutput((prev) => prev + chunkValue);
  //       console.log("hello");

  //     }
  //     setEditBtn(true)
  //     setDownload(true);

  //     toast.success("Generated Courage-CL-Purpose!");

  //   };

  const experiences = `
Other Experiences-${otherExperiences}

From the Other Experiences,
What are the other experiences that the applicant has undertaken? What work did the applicant undertake and what were some of their achievements?
Do not add any new information. Only make use of information given above. If some information is not available say "Not available".
Keep the sentences short and crisp. Give the details in no more than 2 sentences per point in the following format for each achievement separately-
Experience
Responsibility
Achievements

Wherever information is not available say "Not available". Do not add any new information. Answer in brief do not make superfluous sentences.

`

  // const generateExperience = async (e: any) => {
  //   e.preventDefault()
  //   setEditBtn(false)
  //   const response = await fetch('/api/experiences', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ experiences }),
  //   })
  //   const data = response.body
  //   if (!data) {
  //     console.log('No data')
  //     return
  //   }
  //   const reader = data.getReader()
  //   const decoder = new TextDecoder()
  //   let done = false

  //   while (!done) {
  //     const { value, done: doneReading } = await reader.read()
  //     done = doneReading
  //     const chunkValue = decoder.decode(value)
  //     setGeneratedOutput((prev) => prev + chunkValue)
  //     console.log('hello')
  //   }

  //   setGeneratedOutput((prev) => prev + '\n\n')

  //   generateCourage(e)
  //   setEditBtn(true)
  //   setDownload(true)
  // }

  const courageSummary = `
  Courage Essay- " ${courageEssay} "

  From the Courage Essay, "What is the ambitious commitment the applicant undertook? How long did they work on this commitment? What were some of the challenges the applicant faced? How did the applicant respond to these challenges? 
  Do not add any new information. Only make use of information given above. If some information is not available, say "Not available".
  Give the details in no more than 2 sentences per point in the following fomat-
  Commitment
  Duration
  Challenges
  Response to Challenges
  
  Wherever information is not available, say "Not available". Do not add any new information. Answer in brief, do not make superfluous sentences.
  `

  const generateCourageSummary = async () => {
    setDownload(false)
    setEditBtn(false)
    const response = await fetch('/api/courage-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courageSummary }),
    })
    const data = response.body
    if (!data) {
      console.log('No data')
      return
    }
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedCourageSummary((prev) => prev + chunkValue)
    }

    toast.success('Generated Courage Summary!')

    setEditBtn(true)
    setDownload(true)
  }

  const courageQuestions = `
Courage Essay- " ${courageEssay} "

Logic-1- All non-personal commitments are any commitments that have a direct or indirect impact on the personal or professional lives of other people. These commitments can be made as an individual or as a part of a larger group. These commitments can have personal motivation, but must positively affect the lives of others.
Based on the given logic-1, classify the above mentioned commitment as "Personal" or "Non-personal" and follow the instructions given below-

For "Personal commitments" display the text enclosed within { }
{"The Fellowship is an ambitious and challenging commitment. Fellows face several challenges while working towards these ambitious goals they set for themselves and their Students.
As a Fellow, you would be working towards ambitious goals to provide an excellent education for your students. You would face multiple challenges along the way.
I know you shared an experience in the application form. However, we'd like for you to think about another experience where you set or worked towards an ambitious commitment. This commitment should be at least one month long, from a formal context, and one that is either from an extracurricular or professional context.
Now, you must only ask all the questions below.      
"Q1. Could you start by telling me, what was the ambitious commitment you were working towards and what made it ambitious?
If they are unclear/is not a valid commitment for this competency evaluation, probe to understand any big bold or substantial commitment they were working towards."        
"Q2. How long did you have to achieve this commitment?
If not shared, probe and understand when was this commitment from."      
Q3. Now talk to me about the challenges (difficulties or obstacles) you faced?        
Q4. When did you realise keeping this commitment would be so challenging and ambitious, and how did that make you feel?      
Q5. What did you do in response to these challenges?        
Q6. Finally, tell me, what was the outcome?"}      

If the commitment is "Personal" do not go to Logic 1.25, 1.5 , 2 or 3 given below.

Follow Logic 1.25, 1.5, 2, and only for "Non-personal commitments"-

Logic 1.25-  Today is August 2023. Valid commitments must have be undertaken in the past 4 years. Valid commitments must also be minimum one month long.
If the applicant does not mention a specific date/timeline when the commitment was undertaken or the duration of the commitment say "Not clear".
If the commitment was undertaken longer than 4 years ago or was shorter than 1 month say "Invalid".
In the commitment mentioned above look at the responses the applicant has mentioned and based on logic 1.25 is the commitment "Valid", "Invalid" or "Not clear"? Give me a one line reasoning for the selection. Do not assume any information. Only make use of the information given in the commitment. Only for an "Not clear" commitment also show the text enclosed within {}
{"Q. How long did you have to achieve this commitment? If not shared, probe and understand when was this commitment from."}      

Logic-1.5- In the commitment mentioned above look at the responses the applicant has mentioned and does the applicant mention a specific commitment they were working on? If not show the text enclosed within {}  
{"Q. Could you start by telling me, what was the ambitious commitment you were working towards and what made it ambitious? If they are unclear/is not a valid commitment for this competency evaluation, probe to understand any big bold or substantial commitment they were working towards."}

Logic-2- Ambitious commitments have the following possible characteristics- displaying or learning different kinds of skills; taking up different tasks or projects; universally acknowledged as ambitious; working towards something that has not been done in the past; taking up things that might be changing the status quo; having external barriers; leading or working with multiple/diverse stakeholders; possessing uncertainity of success; initiated task/project; impacting a large scale.

In the commitment mentioned above look at the responses the applicant has mentioned and based on the above given logic-2, classify the above mentioned commitment as "ambitious" or "Non-ambitious". And for "Non-ambitious" show the text enclosed within  {}
{"Q. How long did you have to achieve this commitment? If not shared, probe and understand when was this commitment from."} . Do give a 10 word explanation.

Logic-3- Responses to challenges that do not talk about the specific actions undertaken by the applicant during the commitment, or that talk about one or 2 approaches in order to address the challenge at hand, or giving up midway, or leaving it for others to solve are "Vague/Limited efforts". Examples - During my PG, I did an internship which was very challenging at first but eventually I was able to do very well and achieve targets- Vague, While teaching in a school which was located in a conservative neighbourhood realised that parents stopped sending some girls to school and in response mentioned that they thought about it and understood that this is an issue which can be better dealt by higher authorities - Limited effort.
Responses where the applicant mentiones specific strategies and steps undertaken to address majority of the challenges they have mentioned are "Good to Go".

In the commitment mentioned above look at the responses the applicant has mentioned for challenges they faced, follow logic-3 and categorise the response to challenges as "Vague/Limited effort", or "good to go".

For "Vague/Limited efforts" show the text enclosed within {}
{Q3. Now talk to me about the challenges (difficulties or obstacles) you faced?      
Q4. When did you realise keeping this commitment would be so challenging and ambitious, and how did that make you feel?  
Q5. What did you do in response to these challenges?
Q6. Finally, tell me, what was the outcome?}`

  const generateCourageQuestions = async () => {
    setDownload(false)
    setEditBtn(false)
    const response = await fetch('/api/courage-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courageQuestions }),
    })
    const data = response.body
    if (!data) {
      console.log('No data')
      return
    }
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedCourageQuestions((prev) => prev + chunkValue)
    }

    toast.success('Generated Courage Questions!')

    setEditBtn(true)
    setDownload(true)
  }

  const clSummary = `
CL Essay - " ${clEssay} "

From the CL Essay, Give the details in the following format-
"What are some of the strengths the applicant has explicitly mentioned? Include with some context (if available)
What are some of the areas of growth the applicant has explicitly mentioned? Include with some context (if available)
What is the rationale given by the applicant for these areas of growth?
Do not add any new information. Only make use of information given above. If some information is not available say "Not available"

Give the answers in one line in the following format -
Strengths
AOGs
Rationale for AOG

Wherever information is not available say "Not available". Do not add any new information. Answer in brief do not make superfluous sentences.`

  const generateCLSummary = async () => {
    setDownload(false)
    setEditBtn(false)
    const response = await fetch('/api/cl-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clSummary }),
    })
    const data = response.body
    if (!data) {
      console.log('No data')
      return
    }
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedCLSummary((prev) => prev + chunkValue)
    }

    toast.success('Generated CL Summary!')
    setEditBtn(true)
    setDownload(true)
  }

  const clQuestions = `
CL Essay - " ${clEssay} "

Logic 1- Above essays are written by applicants for being a part of the Teach For India fellowship. These essays are a part of their application process.
Areas of development are any gaps in knowledge, skills or mindsets that are mentioned in the essays.
 A. "Completely invalid" response is the one where the essay does not include strengths and area of development is missing from the essay.
B. An "invalid" response is one of these 4 cases-
i. response does not articulated any area of development at all, or
ii. response does not include any rationale for the area of development, or
ii. area of development mentioned in the response is externalised (example- my community was not supportive, so I was not able to continue the project), or
iv. has articulated a rationale for the area of development which is not related or linked to the area of development. (example- I want to learn how to speak English fluently, because I like talking very much.)
C. A "valid" response would contain strengths, areas of development and a clear rationale linked to the area of development.

The above given Response Essay is expected to have strengths, areas of developments and a clear rationale for the areas of development mentioned.
Based on Logic 1 given above, classify the above given Response Essay as "Completely Invalid", "Invalid" or "Valid", give a one line rationale for your choice, and follow the instructions given below-

For all "Completely Invalid" responses display the text enclosed within { }

{"On your application form, you shared about a time when <insert summary of courage experience>. Keeping this experience in mind, tell me,
Q1. What do you think were some of the strengths you demonstrated through this experience? These might be indicated by knowledge, skills or mindsets which likely led you to success.
Q2. What were some areas of development that might have held you back from being more successful or slowed your progress? These might be indicated by any gaps in your knowledge, skills or mindsets.
If they don't understand AOD, reiterate: These might be aspects where there might be room for improvement, knowledge/skills or mindsets which could be better.
If the AOD seems very vague/general or not linked to the experience, ask: How would this help in <courage experience>?
Q3. Why would you pick these as your main areas of development in this experience?
If they don't share a rationale specific to the experience, ask: How would it have helped in this experience?"}

For "Invalid" responses display the text enclosed within { }
{Q2. What were some areas of development that might have held you back from being more successful or slowed your progress? These might be indicated by any gaps in your knowledge, skills or mindsets.
If they don't understand AOD, reiterate: These might be aspects where there might be room for improvement, knowledge/skills or mindsets which could be better.
If the AOD seems very vague/general or not linked to the experience, ask: How would this help in <courage experience>?
Q3. Why would you pick these as your main areas of development in this experience?
If they don't share a rationale specific to the experience, ask: How would it have helped in this experience?"}

For "Valid" simply say "Good to go!"

Do not assume anything. Do not add any new information. Do not make additional inferences.`

  const generateCLQuestions = async () => {
    setDownload(false)
    setEditBtn(false)
    const response = await fetch('/api/cl-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clQuestions }),
    })
    const data = response.body
    if (!data) {
      console.log('No data')
      return
    }
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedCLQuestions((prev) => prev + chunkValue)
    }

    toast.success('Generated CL Questions!')

    setEditBtn(true)
    setDownload(true)
  }

  const purposeSummary = `
  Purpose Essay - " ${purposeEssay} "

  From the Purpose Essay,
  Explain in short what is the applicant's vision of excellent education for academics and what is it beyond academics? Use the exact words used by the applicant. Do not add any new information.
  Explain in short what goals does the applicant want to set for their classroom and how will they achieve these goals? Use the exact words used by the applicant. Do not add any new information.
  Explain in short why the applicant wants to join Teach For India? Use the exact words used by the applicant. Do not add any new information.
  Keep the sentences short and crisp. Give the details in no more than 2 sentences per point in this format-
  Vision for Academics
  Vision beyond Academics
  Goals for class
  How to achieve goals
  Why TFI
 
  Wherever information is not available say "Not available". Do not add any new information. Answer in brief do not make superfluous sentences.`

  const generatePurposeSummary = async () => {
    setDownload(false)

    setEditBtn(false)
    const response = await fetch('/api/purpose-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ purposeSummary }),
    })
    const data = response.body
    if (!data) {
      console.log('No data')
      return
    }
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedPurposeSummary((prev) => prev + chunkValue)
    }

    toast.success('Generated Purpose Summary!')

    setSummaryDone(true)

    setEditBtn(true)
    setDownload(true)
  }

  const purposeQuestions = `
Purpose Essay - " ${purposeEssay} "
  
Purpose- Does the above essay answer all the following questions clearly? If No, say "NO" for the questions it does not answer, if yes say "Yes" and give one line answers to all the questions.
- Why does someone want to join TFI or what excites them about TFI?
- What change does the applicant want to make? Why?
- Has the author explicitly addressed the issue of educational inequity in their essay, and have they provided a clear and logical explanation for their interest in this area?

VOEE- Does the above essay answer all the following questions clearly? If No, say "NO"for the questions it does not answer, if yes say "Yes" and give one line answers to all the questions.
- Does the essay clearly articulate the applicant's vision of an excellent education?
- Does the essay include both academic aspects like student grades, textbooks/syllabus, learning about a particular subject or academic competency?
- Does the essay include any of the following non-academic aspects- values and mindsets, access and exposure, or extracurricular activities as a part of education in the essay?`

  const generatePurposeQuestions = async () => {
    setDownload(false)

    setEditBtn(false)
    const response = await fetch('/api/purpose-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ purposeQuestions }),
    })
    const data = response.body
    if (!data) {
      console.log('No data')
      return
    }
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedPurposeQuestions((prev) => prev + chunkValue)
    }

    toast.success('Generated Purpose Questions!')

    setEditBtn(true)
    setDownload(true)
  }

  const writingPrompt = `
Courage Essay - " ${courageEssay} "
Purpose Essay - " ${purposeEssay} "

You are an essay evaluator for a teaching program. Your task is to classify essays as Flag, Concern, Okay or Solid based on the guidelines given below.
Potential errors to check for- Poor Word Choice, Article Usage, Preposition Usage, Verb Forms, Poor Sentence Construction, Spellings

What is the likelihood between 1-5 that the person who wrote this essay would teach children correct english? 
1- this person would teach english incorrectly
5- this person would definitely teach great english 

Rubric-

Flag
"Has multiple/consistent grammatical errors and poorly constructed sentences
OR
Has multiple/consistent spelling errors and/or inaccurate word choices used in the essays."	

Concern
"Has more than a few grammatical errors and poorly constructed sentences
OR
Has more than a few spelling errors and/or inaccurate word choices used in the essays."	

Okay
"Has limited or infrequent grammatical errors and poorly constructed sentences
AND
Spelling errors and inaccurate word choices are limited. "	

Solid
"Has extremely rare or no grammatical errors and poorly constructed sentences
AND
Spelling errors and inaccurate word choices are extremely rare or absent. "

Give the output in the following format. ONLY give reasons with examples from the essay if the classification is a "concern" or "flag". Max 3 reasons.
"Classification-"
"Score-"
`

  const generateWriting = async () => {
    setDownload(false)

    setEditBtn(false)
    const response = await fetch('/api/writing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ writingPrompt }),
    })
    const data = response.body
    if (!data) {
      console.log('No data')
      return
    }
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedWriting((prev) => prev + chunkValue)
    }

    toast.success('Generated Writing Evaluation!')

    setEditBtn(true)
    setDownload(true)
  }

  return (
    <div className="flex flex-col items-center">
      <UserNav
        pic={userPic}
        logout={logout}
        displayName={userDisplayName}
        email={userEmail}
        initials={nameInitials}
      />
      <main className="flex w-full flex-col items-center justify-start text-center my-12">
        <Toaster
          closeButton
          expand={true}
          theme="dark"
          className="bg-black text-lg"
        />

        <div className="w-full max-w-[60%]">
          <div>
            <div>
              <Label
                htmlFor="educationDetails"
                className="mt-10 flex items-center space-x-2"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                  1
                </span>
                <p className="text-xl font-semibold">Education Details</p>
              </Label>

              <div className="mt-3">
                <Textarea
                  id="educationDetails"
                  value={educationDetails}
                  onChange={(e) => setEducationDetails(e.target.value)}
                  placeholder="Enter Education Details"
                  rows={4}
                ></Textarea>
              </div>
            </div>
            <div>
              <Label
                htmlFor="workExDetails"
                className="mt-10 flex items-center space-x-2"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                  2
                </span>
                <p className="text-xl font-semibold">Work Experience Details</p>
              </Label>

              <div className="mt-3">
                <Textarea
                  id="workExDetails"
                  value={workExDetails}
                  onChange={(e) => setWorkExDetails(e.target.value)}
                  placeholder="Enter Work Ex Details"
                  rows={4}
                ></Textarea>
              </div>
            </div>
            <div>
              <Label
                htmlFor="otherExperiences"
                className="mt-10 flex items-center space-x-2"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                  3
                </span>
                <p className="text-xl font-semibold">Other Experiences</p>
              </Label>

              <div className="mt-3">
                <Textarea
                  id="otherExperiences"
                  value={otherExperiences}
                  onChange={(e) => setOtherExperiences(e.target.value)}
                  placeholder="Enter Other Experiences"
                  rows={4}
                ></Textarea>
              </div>
            </div>
            <div id="Courage Essay-div">
              <Label
                htmlFor="courageEssay"
                className="mt-10 flex items-center space-x-2"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                  4
                </span>
                <p className="text-xl font-semibold">Courage Essay</p>
              </Label>

              <div className="mt-3">
                <Textarea
                  id="courageEssay"
                  value={courageEssay}
                  onChange={(e) => setCourageEssay(e.target.value)}
                  placeholder="Enter Courage Essay"
                  rows={4}
                ></Textarea>
              </div>
            </div>
            <div>
              <Label
                htmlFor="clEssay"
                className="mt-10 flex items-center space-x-2"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                  5
                </span>
                <p className="text-xl font-semibold">CL Essay</p>
              </Label>

              <div className="mt-3">
                <Textarea
                  id="clEssay"
                  value={clEssay}
                  onChange={(e) => setClEssay(e.target.value)}
                  placeholder="Enter CL Essay"
                  rows={4}
                ></Textarea>
              </div>
            </div>
            <div>
              <Label
                htmlFor="purposeEssay"
                className="mt-10 flex items-center space-x-2"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                  6
                </span>
                <p className="text-xl font-semibold">Purpose Essay</p>
              </Label>

              <div className="mt-3">
                <Textarea
                  id="purposeEssay"
                  value={purposeEssay}
                  onChange={(e) => setPurposeEssay(e.target.value)}
                  placeholder="Enter Purpose Essay"
                  rows={4}
                ></Textarea>
              </div>
            </div>
          </div>

          <div className="my-8 space-y-4">
            <Button
              className="w-full"
              onClick={generatePrompts}
              disabled={loading}
            >
              {loading ? (
                <LoadingDots color="white" style="large" />
              ) : (
                <span className="text-lg font-semibold">Generate</span>
              )}
            </Button>

            <Button
              onClick={(e) => {
                handleReset(e)
              }}
              className="w-full text-lg font-semibold bg-slate-200 hover:bg-slate-300 text-black"
            >
              Reset
            </Button>
          </div>

          <div className="mt-5 flex w-full justify-center">
            <Tabs className="w-[100%]" defaultValue="Summary">
              <TabsList className="grid w-full h-12 grid-cols-3">
                <TabsTrigger
                  className="text-base sm:text-lg font-semibold"
                  value="Summary"
                >
                  Summary
                </TabsTrigger>
                <TabsTrigger
                  className="text-base sm:text-lg font-semibold"
                  value="Questions"
                >
                  Question
                </TabsTrigger>
                <TabsTrigger
                  className="text-base sm:text-lg font-semibold"
                  value="Writing"
                >
                  Writing
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Summary">
                <div className="mt-2 flex w-full justify-center">
                  <Tabs className="w-[100%]" defaultValue="AO Summary">
                    <TabsList className="grid h-24 w-full grid-cols-2">
                      <TabsTrigger
                        className="text-base sm:text-lg font-semibold"
                        value="AO Summary"
                      >
                        AO Summary
                      </TabsTrigger>
                      <TabsTrigger
                        className="text-base sm:text-lg font-semibold"
                        value="Courage Summary"
                      >
                        Courage Summary
                      </TabsTrigger>
                      <TabsTrigger
                        className="text-base sm:text-lg font-semibold"
                        value="CL Summary"
                      >
                        CL Summary
                      </TabsTrigger>
                      <TabsTrigger
                        className="text-base sm:text-lg font-semibold"
                        value="Purpose Summary"
                      >
                        Purpose Summary
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="AO Summary">
                      <Output
                        title="AO Summary"
                        disabled={!download}
                        output={generatedAOSummary as string}
                        editedOutput={setGeneratedAOSummary}
                        edit={editBtn}
                      />
                    </TabsContent>
                    <TabsContent value="Courage Summary">
                      <Output
                        title="Courage Summary"
                        disabled={!download}
                        output={generatedCourageSummary as string}
                        editedOutput={setGeneratedCourageSummary}
                        edit={editBtn}
                      />
                    </TabsContent>
                    <TabsContent value="CL Summary">
                      <Output
                        title="CL Summary"
                        disabled={!download}
                        output={generatedCLSummary as string}
                        editedOutput={setGeneratedCLSummary}
                        edit={editBtn}
                      />
                    </TabsContent>
                    <TabsContent value="Purpose Summary">
                      <Output
                        title="Purpose Summary"
                        disabled={!download}
                        output={generatedPurposeSummary as string}
                        editedOutput={setGeneratedPurposeSummary}
                        edit={editBtn}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>
              <TabsContent value="Questions">
                <div className="mt-2 flex w-full justify-center">
                  <Tabs className="w-[100%]" defaultValue="AO Questions">
                    <TabsList className="grid h-24 w-full grid-cols-2">
                      <TabsTrigger
                        className="text-base sm:text-lg font-semibold"
                        value="AO Questions"
                      >
                        AO Questions
                      </TabsTrigger>
                      <TabsTrigger
                        className="text-base sm:text-lg font-semibold"
                        value="Courage Questions"
                      >
                        Courage Questions
                      </TabsTrigger>
                      <TabsTrigger
                        className="text-base sm:text-lg font-semibold"
                        value="CL Questions"
                      >
                        CL Questions
                      </TabsTrigger>
                      <TabsTrigger
                        className="text-base sm:text-lg font-semibold"
                        value="Purpose Questions"
                      >
                        Purpose Questions
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="AO Questions">
                      <Output
                        title="AO Questions"
                        disabled={!download}
                        output={generatedAOQuestions as string}
                        editedOutput={setGeneratedAOQuestions}
                        edit={editBtn}
                      />
                    </TabsContent>
                    <TabsContent value="Courage Questions">
                      <Output
                        title="Courage Questions"
                        disabled={!download}
                        output={generatedCourageQuestions as string}
                        editedOutput={setGeneratedCourageQuestions}
                        edit={editBtn}
                      />
                    </TabsContent>
                    <TabsContent value="CL Questions">
                      <Output
                        title="CL Questions"
                        disabled={!download}
                        output={generatedCLQuestions as string}
                        editedOutput={setGeneratedCLQuestions}
                        edit={editBtn}
                      />
                    </TabsContent>
                    <TabsContent value="Purpose Questions">
                      <Output
                        title="Purpose Questions"
                        disabled={!download}
                        output={generatedPurposeQuestions as string}
                        editedOutput={setGeneratedPurposeQuestions}
                        edit={editBtn}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>

              <TabsContent value="Writing">
                <Output
                  title="Writing"
                  disabled={!download}
                  output={generatedWriting as string}
                  editedOutput={setGeneratedWriting}
                  edit={editBtn}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage

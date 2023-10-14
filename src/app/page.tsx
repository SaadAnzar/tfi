'use client'

import LoadingDots from '@/components/LoadingDots'
import Output from '@/components/Output'
import UserNav from '@/components/ui/UserNav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

const edctn = `Undergraduate College
Anna University,Tiruchirappalli
Undergraduate College (If Other)
Undergraduate Degree
Bachelor of Technology
Undergraduate Degree (If Other)
Undergraduate Stream
Engineering
Edit Undergraduate Stream
Undergraduate Selectivity
Other
Undergraduation Completion Date
1/5/2003
Undergraduate Grading System
Percentage
Undergraduate Percentage
76.00%


Postgraduate College
Sathyabama Institute of Science and Technology/Sathyabama University
Postgraduate College (If Other)
Postgraduate Degree
Master of Technology
Postgraduate Degree (If Other)
Postgraduate Stream
Engineering
Edit Postgraduate Stream
Postgraduate Selectivity
Normal
Postgraduation Completion Date
1/5/2005
Postgraduate Grading System
Percentage
Postgraduate Percentage
80.00%


Additional Degree College (If Other)
Sri Venkateshwara Institute of teacher training,chennai
Additional Degree
Other
Additional Degree (If Other)
Diploma in kindergarten teacher training and Montessori
Additional Degree Stream
Other
Edit Additional Degree Stream
Additional Degree Completion Date
1/1/2020
Additional Degree Selectivity
Other
Additional Degree Grading System
Percentage
Additional Degree Percentage
84.00%`

const workex = `Total Work Experience in months
34
Current Working Status
Have worked previously
Months Manually Entered

Career gap in months
42
Career gap evidence
I have been utilizing my time in spreading awareness to the people regarding sustainable environment. Educating domestic/household workers about online banking. Helping underprivileged children in their studies, spoken English.
Experience 1: Employer's Name
Experience 1: Employer's name (If Other)
Bharath University
Experience 1: Position Held
Lecturer
Exp 1: Responsibilities and Achievements
When I was working as lecturer I have been handling projects and classes for Biotechnology and bioinformatics students. I have trained and guided the students for their future studies.
Experience 1: Total tenure in months
34
Experience 1: Start Date
1/8/2009
Experience 1: End Date
1/6/2012`

const otherex = `Teaching, Making lesson plans, and Co-ordinating various cultural events held in schools. Done online internship for three months in Swami Sivananda Memorial Primary School teaching English to primary class students. Done TGT internship as a part of B.ed in online mode in Guru Harkrishan Public School. Member and volunteer of the National Service Scheme (NSS) cell. ( Guru Nanak College of Education)`

const couressa = `During my B.ed internship, my responsibility was teaching social science to classes VII and VIII and English to class VII. My task was to manage classes and develop and implement comprehensive lesson plans. I was always ambitious about teaching and learning new things. So, I developed new ways of teaching through creative means by using technology to enhance student learning - making ppts and videos for online classes. I also have the responsibility of developing and implementing comprehensive lesson plans and conducting different research studies for my subjects. I was getting familiar with the school environment and started getting enjoyment out of all the school activities and improving my overall conduct in all the classes. To motivate my students I engage them with different activities like the inclusion of maps, word games, etc. Finally recapitulating regularly with students was a good point in conducting an effective class. During the start of my B.ed internship, I faced a problem with the management of classes. But as time passes by I learn how to understand the needs of students as well as take care of the discipline. I started by applying some ground rules and reinforcing them by repeating and reminding them as and when required. The students started to recognize the rules and start abiding by them. Also , engaging the students with creative activities will help to motivate them and foster a positive learning environment. Engaging them with activities like puzzle solving , word building , creating interests in them through various ppts, and videos . Also havin g student centric classrooms and having discussions on various topics had a positive influence and helped to solve the above problem effectively.`

const clessa = `a. I have a positive mindset and a keenness of learning continuously, therefore I was able to grasp new concepts and create engaging lesson plans and activities to make the students more motivated toward learning. I am dedicated to my work with a passion for helping students to reach their full potential. b. Initially, I had a problem managing time with various activities but as I become more familiar with the classes I was able to divide the time fruitfully in creating lesson plans, teaching aids, and delivering the classes. c. This was because I did not have any prior experience of working under such pressure but as time passes by I started enjoying all this and therefore I was able to manage the time more effectively and doing my tasks more effeciently.`

const prpsessay = `As my mother was a teacher of social sciences in a govt. school for 34 years, I think I've witnessed education for the underprivileged up close. I'm aware of the challenges (both sociological and economical) that children of these communities face.

Therefore, in my opinion, an excellent education goes beyond academics, encompassing holistic development, critical thinking, creativity, and empathy. As a Teach for India fellow, my two-year goals for students are multifaceted. Firstly, I will focus on building their confidence and self-esteem, encouraging a growth mindset by recognizing and celebrating their achievements, big and small. Secondly, I will strive for academic excellence by using innovative teaching methods, tailored to diverse learning styles, and providing individual attention. Thirdly, I'll try to foster a personal connect with the students, helping them out in problems in all aspects of life, not just studies. This is something I've seen my mother do with her students, which has ultimately helped them the most to overcome their personal challenges as well.

Moreover, I will actively engage parents and the community to create a strong support system for students. Regular parent-teacher meetings, workshops, and community events will facilitate this collaboration. Additionally, I will implement continuous assessment, providing constructive feedback to students, identifying their strengths, and addressing areas for improvement. Data-driven insights will inform my teaching strategies, ensuring personalized attention.

As I mentioned earlier, being the child of a govt. school teacher, I've witnessed the socio-economic challenges that hinders the underprivileged from attaining education, which in my opinion should be a fundamental right for every human being. Furthermore, I am deeply driven to join the Teach for India Fellowship and be a part of the movement to end educational inequity because I firmly believe that education is a powerful catalyst for social change and empowerment. Witnessing the stark disparities in educational opportunities among underprivileged communities has fueled my determination to make a meaningful impact on the lives of these young minds.

By joining this Fellowship, I will have the opportunity to work directly with students who face significant socio-economic challenges and lack access to quality education. Being a teacher in these communities will enable me to bridge the gap and empower students with the knowledge, skills, and confidence they need to break the cycle of poverty and achieve their full potential.

What excites me about the two-year program is the immersive and transformative experience it offers. The Fellowship provides an intensive platform to develop my teaching abilities, leadership skills, and understanding of educational issues. This fellowship would also provide me the platform to give back to the community and help drive a positive change in people's lives.

Moreover, the program's focus on personal growth and continuous learning aligns with my belief in lifelong learning and growth mindset. The opportunity to witness the positive impact of my efforts on my students and the community will be immensely rewarding, encouraging me to push my boundaries further.

Overall, the Teach for India Fellowship provides the perfect platform for me to channel my passion for education, tackle educational inequity head-on, and contribute to a brighter and more equitable future for the children and communities I serve.`

export default function Home() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  // const [pageLoading, setPageLoading] = useState<boolean>(true);

  // const [format, setFormat] = useState<Formats>("MCQ")
  const [editBtn, setEditBtn] = useState(false)

  // const [generatedOutput, setGeneratedOutput] = useState<String>('')
  // const [generatedOutputAo, setGeneratedOutputAo] = useState<String>('')

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

  const [educationDetails, setEducationDetails] = useState(edctn)
  const [workExDetails, setWorkExDetails] = useState(workex)
  const [otherExperiences, setOtherExperiences] = useState(otherex)
  const [courageEssay, setCourageEssay] = useState(couressa)
  const [clEssay, setClEssay] = useState(clessa)
  const [purposeEssay, setPurposeEssay] = useState(prpsessay)

  const [download, setDownload] = useState(false)

  const [summaryDone, setSummaryDone] = useState(false)

  const [userPic, setUserPic] = useState('')

  const [pageLoading, setPageLoading] = useState<boolean>(true)

  useEffect(() => {
    const userJSON = localStorage.getItem('users')

    const check = Cookies.get('isLoggedIn')

    let user
    if (check == 'true' && userJSON) {
      setPageLoading(false)

      user = JSON.parse(userJSON)
      console.log('check' + user.name)
      setUserPic(user.photoURL)
      console.log('okk' + user.photoURL)
    } else {
      router.push('/login')
    }

    // if (userJSON) {
    //   // User does exist, parse it
    //   // console.log("hello" + userJSON);

    //   user = JSON.parse(userJSON)
    //   // console.log(user.pic);
    //   setUserPic(user.pic)
    //   setPageLoading(false)
    //   console.log(user)
    // } else {
    //   // User does not exist
    //   router.push("/login")

    //   user = null
    // }
    // console.log(user);

    // if (!user) {
    //   console.log("nooooooo")
    //   router.push("/login")
    // }
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    Cookies.set('isLoggedIn', 'false')

    console.log('logout done')

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
    // generateCourageSummary()
    // generateCLSummary()
    // generatePurposeSummary()

    // generateSummary(e)
    // generateQuestions(e)

    // generateExperience(e)
    // addtoDB()
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
      generateCourageQuestions(courageEssay)
      generateCLQuestions(generatedCLSummary)
      generatePurposeQuestions(generatedPurposeSummary)
    }
  }, [summaryDone])

  const clprompt = `
  Other experiences- " ${otherExperiences} ",
  Courage Essay- " ${courageEssay} ",
  CL Essay- " ${clEssay} ",
  Purpose Essay- " ${purposeEssay}"
  From the Other Experiences,
  What are the other experiences that the applicant has undertaken? What work did the applicant did they undertook and what were some of their achievements?
  Do not add any new information. Only make use of information given above. If some information is not available say "Not available".
  Keep the sentences short and crisp. Give the details in no more than 2 sentences per point in the following format for each achievement separately-
  Experience
  Responsibility
  Achivements
  
  
  From the Courage Essay, "What is the ambitious commitment the applicant undertook? How long did they work on this commitment? What were some of the challenges the applicant faced? How did the applicant respond to these challenges? 
  Do not add any new information. Only make use of information given above. If some information is not available say "Not available".
  Give the details in no more than 2 sentences per point in the following fomat-
  Commitment
  Duration
  Challenges
  Response to Challenges
  
  From the CL Essay, Give the details in the following format-
  What are some of the areas of growth (AODs) the applicant has explicitly mentioned? Include with some context (if available)
  What is the rationale given by the applicant for these areas of growth?
  Do not add any new information. Only make use of information given above. If some information is not available say "Not available"
  Keep the sentences short and crisp. Give the details in no more than 2 sentences per point in the following fomat-
  AODs
  Rationale for AOD
  
  From the Purpose Essay,
  Explain in short what is the applicant's vision of excellent education for academics and what is it beyond academics? Use the exact words used by the applicant. Do not add any new information.
  Explain in short what goals does the applicant want to set for their classroom and how will they achieve these goals? Use the exact words used by the applicant. Do not add any new information.
  Explain in short why does the applicant want to join Teach For India? Use the exact words used by the applicant. Do not add any new information.
  Keep the sentences short and crisp. Give the details in no more than 2 sentences per point in this format-
  Vision for Academics
  Vision beyond Academics
  Goals for class
  How to achieve goals
  Why TFI
  
  Wherever information is not availble say "Not available". Do not add any new information. Answer in brief do not make superfluous sentences.`

  const aosummary = `
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
Give an extractive summary in 5 sentences of the work trajectory in a chronological order. In the summary highlight the significant achievements, roles and responsibilites, and the times for the work experience.
Does the applicant have an gap in their work experience?  If so, when were they not working? Do they have any other achievements during the gap? Answer in 2 sentences.

Assume undergrad education takes 3 years and post grad degree and additional degree takes 2 years. Do not include Post grad degree, additional degree or undergrad degree as a gap. You are in Jule 2023, from the information give and the assumptions- identify in which years the applicant might not have been working or not pursuing any educational programs until July 2023. Give the answer as a range.

Do not include the questions in the generated output. Just give the output. Do not add any new information. Only make use of information given in the respective sections. If some information is not available say ""Not available"". 
Make sure all the information is presented in the correct chronological order.
   `

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
      body: JSON.stringify({ aosummary }),
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

    await generateCourageSummary()
    await generateCLSummary()
    await generatePurposeSummary()
  }

  const generateAOQuestions = async (generatedAOSummary: any) => {
    const aoquestion = `This is the summary of AO of the candidate: ${generatedAOSummary}\n
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
      body: JSON.stringify({ aoquestion }),
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

  //   const generateOutputcl = async (e: any) => {
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

  const couragesummary = `Courage Essay- ${courageEssay}

  From the Courage Essay, "What is the ambitious commitment the applicant undertook? How long did they work on this commitment? What were some of the challenges the applicant faced? How did the applicant respond to these challenges? 
  Do not add any new information. Only make use of information given above. If some information is not available say "Not available".
  Give the details in no more than 2 sentences per point in the following fomat-
  Commitment
  Duration
  Challenges
  Response to Challenges
  
  Wherever information is not available say "Not available". Do not add any new information. Answer in brief do not make superfluous sentences.
  `

  const generateCourageSummary = async () => {
    setDownload(false)
    setEditBtn(false)
    const response = await fetch('/api/courage-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ couragesummary }),
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

  const generateCourageQuestions = async (courageEssay: string) => {
    const couragequestion = `This is the essay of Courage part written by the candiidate: ${courageEssay}\n
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
{"Q. How long did you have to achieve this commitment? If not shared, probe and understand when was this commitment from."}	. Do give 10 word explanation.

Logic-3- Responses to challenges that do not talk about the specific actions undertaken by the applicant during the commitment, or that talk about one or 2 approaches in order to address the challenge at hand, or giving up midway, or leaving it for others to solve are "Vague/Limited efforts". Examples - During my PG, I did an internship which was very challenging at first but eventually I was able to do very well and achieve targets- Vague, While teaching in a school which was located in a conservative neighbourhood realised that parents stopped sending some girls to school and in response mentioned that they thought about it and understood that this is an issue which can be better dealt by higher authorities - Limited effort.
Responses where the applicant mentiones specific strategies and steps undertaken to address majority of the challenges they have mentioned are "Good to Go". 

In the commitment mentioned above look at the responses the applicant has mentioned for challenges they faced, follow logic-3 and categorise the response to challenges as "Vague/Limited effort", or "good to go".

For "Vague/Limited efforts" show the text enclosed within {}
{Q3. Now talk to me about the challenges (difficulties or obstacles) you faced?				
Q4. When did you realise keeping this commitment would be so challenging and ambitious, and how did that make you feel?		
Q5. What did you do in response to these challenges?
Q6. Finally, tell me, what was the outcome?}`

    setDownload(false)
    setEditBtn(false)
    const response = await fetch('/api/courage-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ couragequestion }),
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

  const clsummary = ` CL Essay- ${clEssay}


  From the CL Essay, Give the details in the following format-
  What are some of the areas of growth (AODs) the applicant has explicitly mentioned? Include with some context (if available)
  What is the rationale given by the applicant for these areas of growth?
  Do not add any new information. Only make use of information given above. If some information is not available say "Not available"
  Keep the sentences short and crisp. Give the details in no more than 2 sentences per point in the following format-
  AODs
  Rationale for AOD
  
  Wherever information is not available say "Not available". Do not add any new information. Answer in brief do not make superfluous sentences.
  `
  const generateCLSummary = async () => {
    setDownload(false)
    setEditBtn(false)
    const response = await fetch('/api/cl-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clsummary }),
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

  const generateCLQuestions = async (generatedCLSummary: any) => {
    const clquestion = `This is the summary of the CL of the candidate: ${generatedCLSummary}\n
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

    setDownload(false)
    setEditBtn(false)
    const response = await fetch('/api/cl-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clquestion }),
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

  const purposesummary = `
  Purpose Essay- ${purposeEssay}

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
  
  Wherever information is not available say "Not available". Do not add any new information. Answer in brief do not make superfluous sentences.
  
  `
  const generatePurposeSummary = async () => {
    setDownload(false)

    setEditBtn(false)
    const response = await fetch('/api/purpose-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ purposesummary }),
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

  const generatePurposeQuestions = async (generatedPurposeSummary: any) => {
    const purposequestion = `This is the summary of the purpose of the candidate: ${generatedPurposeSummary}\n
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

    setDownload(false)

    setEditBtn(false)
    const response = await fetch('/api/purpose-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ purposequestion }),
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

  return (
    <div className="flex flex-col items-center">
      <UserNav pic={userPic} logout={logout} />
      <div className="flex w-full flex-col items-center justify-center my-10">
        <main className="flex w-full flex-col items-center justify-start text-center">
          <Toaster
            closeButton
            expand={true}
            theme="dark"
            className="bg-black text-lg"
          />

          {/* <h1 className="max-w-[708px] text-4xl font-bold tracking-tighter text-slate-900 sm:text-5xl">
              TFI Selection App Summary
            </h1> */}

          <div className="w-full max-w-[60%]">
            <div id="patient-data-div">
              <div className="mt-10 flex items-center space-x-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                  1
                </span>
                <p className="text-xl font-semibold">Education Details</p>
              </div>

              <div className="mt-3">
                <textarea
                  id="educationDetails"
                  value={educationDetails}
                  onChange={(e) => setEducationDetails(e.target.value)}
                  placeholder="Enter Education Details"
                  className="w-full min-h-[250px] px-4 py-2 rounded-md border border-gray-300 text-gray-700 shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black focus-visible:border-transparent focus-visible:outline-none"
                  rows={4}
                ></textarea>
              </div>
            </div>
            <div id="Work Ex Details-div">
              <div className="mt-10 flex items-center space-x-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                  2
                </span>
                <p className="text-xl font-semibold">Work Ex Details</p>
              </div>

              <div className="mt-3">
                <textarea
                  id="workExDetails"
                  value={workExDetails}
                  onChange={(e) => setWorkExDetails(e.target.value)}
                  placeholder="Enter Work Ex Details"
                  className="w-full min-h-[250px] px-4 py-2 rounded-md border border-gray-300 text-gray-700 shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black focus-visible:border-transparent focus-visible:outline-none"
                  rows={4}
                ></textarea>
              </div>
            </div>
            <div id="Other Experiences-div">
              <div className="mt-10 flex items-center space-x-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                  3
                </span>
                <p className="text-xl font-semibold">Other Experiences</p>
              </div>

              <div className="mt-3">
                <textarea
                  id="otherExperiences"
                  value={otherExperiences}
                  onChange={(e) => setOtherExperiences(e.target.value)}
                  placeholder="Enter Other Experiences"
                  className="w-full min-h-[250px] px-4 py-2 rounded-md border border-gray-300 text-gray-700 shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black focus-visible:border-transparent focus-visible:outline-none"
                  rows={4}
                ></textarea>
              </div>
            </div>
            <div id="Courage Essay-div">
              <div className="mt-10 flex items-center space-x-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                  4
                </span>
                <p className="text-xl font-semibold">Courage Essay</p>
              </div>

              <div className="mt-3">
                <textarea
                  id="courageEssay"
                  value={courageEssay}
                  onChange={(e) => setCourageEssay(e.target.value)}
                  placeholder="Enter Courage Essay"
                  className="w-full min-h-[250px] px-4 py-2 rounded-md border border-gray-300 text-gray-700 shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black focus-visible:border-transparent focus-visible:outline-none"
                  rows={4}
                ></textarea>
              </div>
            </div>
            <div id="CL Essay-div">
              <div className="mt-10 flex items-center space-x-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                  5
                </span>
                <p className="text-xl font-semibold">CL Essay</p>
              </div>

              <div className="mt-3">
                <textarea
                  id="clEssay"
                  value={clEssay}
                  onChange={(e) => setClEssay(e.target.value)}
                  placeholder="Enter CL Essay"
                  className="w-full min-h-[250px] px-4 py-2 rounded-md border border-gray-300 text-gray-700 shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black focus-visible:border-transparent focus-visible:outline-none"
                  rows={4}
                ></textarea>
              </div>
            </div>
            <div id="Purpose Essay-div">
              <div className="mt-10 flex items-center space-x-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-3 text-sm text-white">
                  6
                </span>
                <p className="text-xl font-semibold">Purpose Essay</p>
              </div>

              <div className="mt-3">
                <textarea
                  id="purposeEssay"
                  value={purposeEssay}
                  onChange={(e) => setPurposeEssay(e.target.value)}
                  placeholder="Enter Purpose Essay"
                  className="w-full min-h-[250px] px-4 py-2 rounded-md border border-gray-300 text-gray-700 shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black focus-visible:border-transparent focus-visible:outline-none"
                  rows={4}
                ></textarea>
              </div>
            </div>

            {!loading && (
              <div>
                <button
                  //  disabled={isFormEmpty}
                  onClick={generatePrompts}
                  className="mt-8 w-full rounded-md bg-black px-4 py-2 text-lg font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:mt-10"
                >
                  Generate
                </button>
              </div>
            )}
            {loading && (
              <button
                className="mt-8 w-full rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </button>
            )}
            <button
              onClick={(e) => {
                handleReset(e)
              }}
              className="mt-2 w-full rounded-md bg-slate-200 px-4 py-2 text-lg font-bold text-black hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Reset
            </button>

            <div className="tabs mt-5 flex w-full ">
              <div className="tabs mt-2 flex w-full justify-center">
                <Tabs className="w-[100%]" defaultValue="Summary">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      className="text-base sm:text-lg font-bold tracking-tight"
                      value="Summary"
                    >
                      Summary
                    </TabsTrigger>
                    <TabsTrigger
                      className=" text-base sm:text-lg font-bold tracking-tight break-words"
                      value="Questions"
                    >
                      Question
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="Summary">
                    <div className="tabs mt-5 flex w-full ">
                      <div className="tabs mt-2 flex w-full justify-center">
                        <Tabs className="w-[100%]" defaultValue="AO Summary">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger
                              className="text-base sm:text-lg font-bold tracking-tight"
                              value="AO Summary"
                            >
                              AO Summary
                            </TabsTrigger>
                            <TabsTrigger
                              className=" text-base sm:text-lg font-bold tracking-tight break-words"
                              value="Courage Summary"
                            >
                              Courage Summary
                            </TabsTrigger>
                            <TabsTrigger
                              className=" text-base sm:text-lg font-bold tracking-tight break-words"
                              value="CL Summary"
                            >
                              CL Summary
                            </TabsTrigger>
                            <TabsTrigger
                              className=" text-base sm:text-lg font-bold tracking-tight break-words"
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
                    </div>
                  </TabsContent>
                  <TabsContent value="Questions">
                    <div className="tabs mt-5 flex w-full ">
                      <div className="tabs mt-2 flex w-full justify-center">
                        <Tabs className="w-[100%]" defaultValue="AO Questions">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger
                              className="text-base sm:text-lg font-bold tracking-tight"
                              value="AO Questions"
                            >
                              AO Questions
                            </TabsTrigger>
                            <TabsTrigger
                              className=" text-base sm:text-lg font-bold tracking-tight break-words"
                              value="Courage Questions"
                            >
                              Courage Questions
                            </TabsTrigger>
                            <TabsTrigger
                              className=" text-base sm:text-lg font-bold tracking-tight break-words"
                              value="CL Questions"
                            >
                              CL Questions
                            </TabsTrigger>
                            <TabsTrigger
                              className=" text-base sm:text-lg font-bold tracking-tight break-words"
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
                    </div>
                  </TabsContent>

                  {/* <TabsContent value="Transcript">
                <Transcript outputTranscript={OutputTranscript as string} />
              </TabsContent> */}
                </Tabs>
              </div>

              {/* <Output
                  title="Letter for Doctors"
                  output={generatedOutput as string}
                  setGeneratedOutput={setGeneratedOutput}
                  editBtn={editBtn as boolean}
                />{" "} */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

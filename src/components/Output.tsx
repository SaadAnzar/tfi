import { useRef, useState } from 'react'
import '../app/globals.css'

import { useReactToPrint } from 'react-to-print'
import Link from 'next/link'
import Edit from './edit-btn'
import CopyButton from './copy-button'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { cn } from '@/lib/utils'

interface PromptProps {
  output: string
  setGeneratedOutput: (value: string) => void
  editBtn: boolean
  title: string
}

interface OutputProps {
  output: string
  disabled: boolean
  editedOutput: (value: string) => void
  edit: boolean
  title: string
}

export default function Output({
  output,
  disabled,
  editedOutput,
  edit,
  title,
}: OutputProps) {
  const formattedOutput = output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map((line, index) => {
      if (line.startsWith('From the Other Experiences')) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">From the Other Experiences</p>
            {line.split('From the Other Experiences')[1].trim()}
          </div>
        )
      } else if (line.startsWith('From the Courage Essay')) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">From the Courage Essay</p>
            {line.split('From the Courage Essay')[1].trim()}
          </div>
        )
      } else if (line.startsWith('From the CL Essay')) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">From the CL Essay</p>
            {line.split('From the CL Essay')[1].trim()}
          </div>
        )
      } else if (line.startsWith('From the Purpose Essay')) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">From the Purpose Essay</p>
            {line.split('From the Purpose Essay')[1].trim()}
          </div>
        )
      } else if (
        line.startsWith('In which year did the applicant complete undergrad?')
      ) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">
              In which year did the applicant complete undergrad?
            </p>
            {line
              .split('In which year did the applicant complete undergrad?')[1]
              .trim()}
          </div>
        )
      } else if (line.startsWith('How much did they score?')) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">How much did they score?</p>
            {line.split('How much did they score?')[1].trim()}
          </div>
        )
      } else if (
        line.startsWith('In which year did the applicant complete postgrad?')
      ) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">
              In which year did the applicant complete postgrad?
            </p>
            {line
              .split('In which year did the applicant complete postgrad?')[1]
              .trim()}
          </div>
        )
      } else if (
        line.startsWith(
          'In which year did the applicant complete the additional degree?'
        )
      ) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">
              In which year did the applicant complete the additional degree?
            </p>
            {line
              .split(
                'In which year did the applicant complete the additional degree?'
              )[1]
              .trim()}
          </div>
        )
      } else if (
        line.startsWith(
          'Is the applicant currently working? or Have they worked before?'
        )
      ) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">
              Is the applicant currently working? or Have they worked before?
            </p>
            {line
              .split(
                'Is the applicant currently working? or Have they worked before?'
              )[1]
              .trim()}
          </div>
        )
      } else {
        return (
          <p className="my-2 whitespace-pre-line leading-5" key={index}>
            {line}
          </p>
        )
      }
    })

  const [editMode, setEditMode] = useState(false)
  const [originalOutput, setOriginalOutput] = useState(output)
  const [editableContent, setEditableContent] = useState(output)

  const textareaRef = useRef(null)
  const componentRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Lesson Plan',
    onPrintError: () => alert('there is an error when printing'),
    pageStyle: '@page { size: A4; margin: 8.5mm; }',
  })

  const handleEdit = () => {
    setOriginalOutput(output)
    setEditMode(true)
  }

  const toggleEditMode = () => {
    setEditableContent(output)
    setOriginalOutput(output)
    setEditMode(!editMode)
  }

  const handleSave = () => {
    editedOutput(editableContent)
    setOriginalOutput(editableContent)
    setEditMode(false)
  }

  const handleCancel = () => {
    setEditableContent(originalOutput)
    setEditMode(false)
  }

  return (
    <div className="w-full mt-6">
      <div className="w-full flow-root rounded-lg border-2 border-dashed border-gray-900 px-5 py-6 text-left">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          <li className="py-5">
            <div className="relative">
              <div className="mb-3 flex items-center justify-between gap-3 text-2xl font-bold tracking-tight text-black transition-all">
                <div className="flex gap-3">
                  <span>{title}</span>
                  <CopyButton value={output} />
                </div>

                <Edit
                  isEdit={edit}
                  editMode={editMode}
                  toggleEditMode={toggleEditMode}
                  handleEdit={handleEdit}
                  handleCancel={handleCancel}
                  handleSave={handleSave}
                />
              </div>

              <div
                id="print-pdf"
                className="print:font-inter mt-2 whitespace-pre-line text-base leading-5 print:m-5 print:break-before-page print:break-after-page print:p-5"
                ref={componentRef}
              >
                {editMode ? (
                  <div className="h-full w-full">
                    <Textarea
                      autoFocus
                      ref={textareaRef}
                      rows={output.split('\n').length + 10}
                      value={editableContent}
                      onChange={(e: any) => setEditableContent(e.target.value)}
                      disabled={!editMode}
                    ></Textarea>
                  </div>
                ) : (
                  output
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Button
        onClick={handlePrint}
        className={cn(
          'my-4 text-lg font-medium h-11',
          !edit ? 'hidden' : 'mx-auto block'
        )}
      >
        Download
      </Button>
    </div>
  )
}

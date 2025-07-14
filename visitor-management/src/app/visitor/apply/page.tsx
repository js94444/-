'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface FormData {
  name: string
  company: string
  phone: string
  email: string
  visitDate: string
  visitTime: string
  purpose: string
  companion: string
  privacyAgree: boolean
  attachments: string[] // 파일명 배열 추가
}

export default function VisitorApply() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    visitDate: '',
    visitTime: '',
    purpose: '',
    companion: '',
    privacyAgree: false,
    attachments: []
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // LocalStorage에서 기존 데이터 가져오기
    const existingData = JSON.parse(localStorage.getItem('visitorApplications') || '[]')
    
    // 파일명 배열 저장
    const attachmentNames = selectedFiles ? Array.from(selectedFiles).map(f => f.name) : []

    // 새로운 신청 추가
    const newApplication = {
      ...formData,
      attachments: attachmentNames,
      id: Date.now(),
      status: '대기중',
      submitDate: new Date().toISOString()
    }
    
    // LocalStorage에 저장
    localStorage.setItem('visitorApplications', JSON.stringify([newApplication, ...existingData]))
    
    // 제출 완료 상태로 변경
    setIsSubmitted(true)
    
    // 3초 후 메인 페이지로 이동
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // 파일 첨부 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">신청이 완료되었습니다!</h2>
          <p className="text-gray-600 mb-4">방문신청이 성공적으로 제출되었습니다.</p>
          <p className="text-sm text-gray-500">메인 페이지로 이동합니다...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
              ← 메인으로 돌아가기
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">방문신청서</h2>
            <p className="text-gray-600 mt-1">방문 정보를 입력해주세요</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 기본 정보 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    소속 회사 *
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 방문 정보 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">방문 정보</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700">
                    방문 예정일자 *
                  </label>
                  <input
                    type="date"
                    name="visitDate"
                    id="visitDate"
                    required
                    value={formData.visitDate}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="visitTime" className="block text-sm font-medium text-gray-700">
                    방문 예정시간 *
                  </label>
                  <input
                    type="time"
                    name="visitTime"
                    id="visitTime"
                    required
                    value={formData.visitTime}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                  방문 목적 *
                </label>
                <textarea
                  name="purpose"
                  id="purpose"
                  rows={3}
                  required
                  value={formData.purpose}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="방문 목적을 자세히 입력해주세요"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="companion" className="block text-sm font-medium text-gray-700">
                  동반자 정보
                </label>
                <textarea
                  name="companion"
                  id="companion"
                  rows={2}
                  value={formData.companion}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="동반자가 있는 경우 이름과 소속을 입력해주세요"
                />
              </div>

              {/* 파일 첨부 */}
              <div className="mt-4">
                <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
                  파일 첨부 (여러 개 선택 가능)
                </label>
                <input
                  type="file"
                  name="attachment"
                  id="attachment"
                  multiple
                  onChange={handleFileChange}
                  className="mt-1 block w-full"
                />
                {selectedFiles && selectedFiles.length > 0 && (
                  <ul className="text-xs text-gray-500 mt-1 list-disc list-inside">
                    {Array.from(selectedFiles).map((file, idx) => (
                      <li key={idx}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* 개인정보 동의 */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="privacyAgree"
                  id="privacyAgree"
                  required
                  checked={formData.privacyAgree}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="privacyAgree" className="font-medium text-gray-700">
                  개인정보 수집 및 이용에 동의합니다 *
                </label>
                <p className="text-gray-500">
                  수집된 정보는 방문 신청 및 관리 목적으로만 사용됩니다.
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                신청서 제출
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 
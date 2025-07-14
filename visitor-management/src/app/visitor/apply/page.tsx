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
    privacyAgree: false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.send(
      'service_3gzs7qh',      // 복사한 Service ID
      'template_qzs5r1e',     // 복사한 Template ID
      {
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        visitDate: formData.visitDate,
        visitTime: formData.visitTime,
        purpose: formData.purpose,
        companion: formData.companion,
        // 템플릿에 맞는 변수명 추가
      },
      ' u-wjR1QxMm89__PbF'       // 복사한 Public Key
    ).then(
      (result) => {
        console.log('이메일 전송 성공:', result.text);
      },
      (error) => {
        console.error('이메일 전송 실패:', error.text);
      }
    );
    // LocalStorage에서 기존 데이터 가져오기
    const existingData = JSON.parse(localStorage.getItem('visitorApplications') || '[]')
    
    // 새로운 신청 추가
    const newApplication = {
      ...formData,
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
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
                    방문 일자 *
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
                    방문 시간 *
                  </label>
                  <select
                    name="visitTime"
                    id="visitTime"
                    required
                    value={formData.visitTime}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">시간 선택</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                  </select>
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
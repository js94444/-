'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface VisitorApplication {
  id: number
  name: string
  company: string
  phone: string
  email: string
  visitDate: string
  visitTime: string
  purpose: string
  companion: string
  status: '대기중' | '승인' | '거절'
  submitDate: string
  attachments: string[] // 첨부파일 필드 추가
}

export default function AdminDashboard() {
  const router = useRouter()
  const [applications, setApplications] = useState<VisitorApplication[]>([])
  const [filter, setFilter] = useState<'all' | '대기중' | '승인' | '거절'>('all')
  const [dateFilter, setDateFilter] = useState('') // 날짜 필터 추가
  const [selectedFile, setSelectedFile] = useState<string | null>(null) // 선택된 첨부파일

  useEffect(() => {
    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (!isLoggedIn) {
      router.push('/admin/login')
      return
    }

    // LocalStorage에서 신청 데이터 가져오기
    const storedData = localStorage.getItem('visitorApplications')
    if (storedData) {
      setApplications(JSON.parse(storedData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/')
  }

  const handleStatusChange = (id: number, newStatus: '승인' | '거절') => {
    const updatedApplications = applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    )
    setApplications(updatedApplications)
    localStorage.setItem('visitorApplications', JSON.stringify(updatedApplications))
  }

  // 날짜 필터링 적용
  const filteredApplications = applications.filter(app => {
    const statusMatch = filter === 'all' ? true : app.status === filter
    const dateMatch = dateFilter ? app.visitDate === dateFilter : true
    return statusMatch && dateMatch
  })

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === '대기중').length,
    approved: applications.filter(app => app.status === '승인').length,
    rejected: applications.filter(app => app.status === '거절').length
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR')
  }

  const formatTime = (timeString: string) => {
    return timeString
  }

  // 첨부파일 다운로드 함수 (실제로는 서버에서 파일을 가져와야 함)
  const handleFileDownload = (fileName: string) => {
    // 실제 구현에서는 서버에서 파일을 가져와야 합니다
    alert(`파일 다운로드: ${fileName}\n실제 구현에서는 서버에서 파일을 가져와야 합니다.`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
              <p className="text-gray-600">방문신청 관리 시스템</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                메인으로
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">전체 신청</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">대기중</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">승인</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">거절</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 필터 */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex space-x-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-md ${
                    filter === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  전체 ({stats.total})
                </button>
                <button
                  onClick={() => setFilter('대기중')}
                  className={`px-4 py-2 rounded-md ${
                    filter === '대기중' 
                      ? 'bg-yellow-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  대기중 ({stats.pending})
                </button>
                <button
                  onClick={() => setFilter('승인')}
                  className={`px-4 py-2 rounded-md ${
                    filter === '승인' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  승인 ({stats.approved})
                </button>
                <button
                  onClick={() => setFilter('거절')}
                  className={`px-4 py-2 rounded-md ${
                    filter === '거절' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  거절 ({stats.rejected})
                </button>
              </div>
              
              {/* 날짜 필터 추가 */}
              <div className="flex items-center space-x-2">
                <label htmlFor="dateFilter" className="text-sm font-medium text-gray-700">
                  방문일자:
                </label>
                <input
                  type="date"
                  id="dateFilter"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {dateFilter && (
                  <button
                    onClick={() => setDateFilter('')}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    초기화
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 신청 목록 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">방문신청 목록</h3>
          </div>
          
          {filteredApplications.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">신청 내역이 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      신청자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      방문 정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      첨부파일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      신청일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{application.name}</div>
                          <div className="text-sm text-gray-500">{application.company}</div>
                          <div className="text-sm text-gray-500">{application.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">
                            {formatDate(application.visitDate)} {formatTime(application.visitTime)}
                          </div>
                          <div className="text-sm text-gray-500">{application.purpose}</div>
                          {application.companion && (
                            <div className="text-sm text-gray-500">동반: {application.companion}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          {application.attachments && application.attachments.length > 0 ? (
                            <div className="space-y-1">
                              {application.attachments.map((fileName, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleFileDownload(fileName)}
                                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  📎 {fileName}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">첨부파일 없음</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(application.submitDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          application.status === '대기중' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : application.status === '승인'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {application.status === '대기중' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleStatusChange(application.id, '승인')}
                              className="text-green-600 hover:text-green-900"
                            >
                              승인
                            </button>
                            <button
                              onClick={() => handleStatusChange(application.id, '거절')}
                              className="text-red-600 hover:text-red-900"
                            >
                              거절
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
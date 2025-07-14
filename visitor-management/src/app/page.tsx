import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            방문신청 관리 시스템
          </h1>
          <p className="text-xl text-gray-600">
            안전하고 효율적인 방문 관리를 위한 디지털 플랫폼
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 방문자 섹션 */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">방문자</h2>
              <p className="text-gray-600 mb-6">
                방문신청서를 작성하고 신청 현황을 확인하세요
              </p>
              <Link 
                href="/visitor/apply"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                방문신청하기
              </Link>
            </div>
          </div>

          {/* 운영자 섹션 */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">운영자</h2>
              <p className="text-gray-600 mb-6">
                방문신청을 관리하고 승인/거절을 처리하세요
              </p>
              <Link 
                href="/admin/login"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                관리자 로그인
              </Link>
            </div>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">시스템 특징</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <div className="font-medium text-blue-600 mb-1">간편한 신청</div>
                <div>온라인으로 쉽고 빠른 방문신청</div>
              </div>
              <div>
                <div className="font-medium text-green-600 mb-1">실시간 관리</div>
                <div>신청 현황을 실시간으로 확인</div>
              </div>
              <div>
                <div className="font-medium text-purple-600 mb-1">안전한 보안</div>
                <div>개인정보 보호 및 안전한 데이터 관리</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

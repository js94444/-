import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'applications.json')

// 데이터 파일이 없으면 생성
async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE)
  } catch {
    // 파일이 없으면 빈 배열로 생성
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify([]))
  }
}

// 신청서 저장
export async function POST(request: NextRequest) {
  try {
    await ensureDataFile()
    
    const application = await request.json()
    
    // 기존 데이터 읽기
    const existingData = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'))
    
    // 새 신청서 추가 (ID 생성)
    const newApplication = {
      ...application,
      id: Date.now(),
      submitDate: new Date().toISOString()
    }
    
    // 데이터 저장
    const updatedData = [newApplication, ...existingData]
    await fs.writeFile(DATA_FILE, JSON.stringify(updatedData, null, 2))
    
    return NextResponse.json({ success: true, id: newApplication.id })
  } catch (error) {
    console.error('신청서 저장 오류:', error)
    return NextResponse.json(
      { error: '신청서 저장에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// 신청서 조회
export async function GET() {
  try {
    await ensureDataFile()
    
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const applications = JSON.parse(data)
    
    return NextResponse.json(applications)
  } catch (error) {
    console.error('신청서 조회 오류:', error)
    return NextResponse.json(
      { error: '신청서 조회에 실패했습니다.' },
      { status: 500 }
    )
  }
} 
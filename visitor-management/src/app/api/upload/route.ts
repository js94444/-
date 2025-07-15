import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

// 업로드 디렉토리가 없으면 생성
async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true })
  } catch (error) {
    console.error('업로드 디렉토리 생성 오류:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureUploadDir()
    
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: '업로드할 파일이 없습니다.' },
        { status: 400 }
      )
    }
    
    const uploadedFiles = []
    
    for (const file of files) {
      // 파일명 중복 방지를 위해 타임스탬프 추가
      const timestamp = Date.now()
      const fileName = `${timestamp}-${file.name}`
      const filePath = path.join(UPLOAD_DIR, fileName)
      
      // 파일을 바이트 배열로 변환
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // 파일 저장
      await writeFile(filePath, buffer)
      
      uploadedFiles.push({
        originalName: file.name,
        fileName: fileName,
        path: `/uploads/${fileName}`,
        size: file.size
      })
    }
    
    return NextResponse.json({
      success: true,
      files: uploadedFiles
    })
  } catch (error) {
    console.error('파일 업로드 오류:', error)
    return NextResponse.json(
      { error: '파일 업로드에 실패했습니다.' },
      { status: 500 }
    )
  }
} 
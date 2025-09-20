interface StoredFile {
  buffer: Buffer
  metadata: {
    originalName: string
    filename: string
    size: number
    type: string
    uploadedAt: string
  }
}

// In-memory storage for uploaded files (works on Vercel serverless)
// Note: Files are automatically cleaned up between function invocations
const fileStore = new Map<string, StoredFile>()

// Track cleanup timeouts to prevent memory leaks
const cleanupTimeouts = new Map<string, NodeJS.Timeout>()

export function storeFile(fileId: string, buffer: Buffer, metadata: any): void {
  // Clear any existing cleanup timeout
  const existingTimeout = cleanupTimeouts.get(fileId)
  if (existingTimeout) {
    clearTimeout(existingTimeout)
  }

  fileStore.set(fileId, { buffer, metadata })

  // Clean up after 30 minutes (Vercel function timeout is typically much shorter)
  const timeout = setTimeout(() => {
    fileStore.delete(fileId)
    cleanupTimeouts.delete(fileId)
  }, 30 * 60 * 1000)
  
  cleanupTimeouts.set(fileId, timeout)
  
  console.log(`[FileStorage] Stored file ${fileId}, size: ${buffer.length} bytes`)
}

export function getFile(fileId: string): StoredFile | null {
  const file = fileStore.get(fileId) || null
  if (file) {
    console.log(`[FileStorage] Retrieved file ${fileId}`)
  } else {
    console.log(`[FileStorage] File ${fileId} not found`)
  }
  return file
}

export function deleteFile(fileId: string): void {
  // Clear cleanup timeout
  const timeout = cleanupTimeouts.get(fileId)
  if (timeout) {
    clearTimeout(timeout)
    cleanupTimeouts.delete(fileId)
  }
  
  const deleted = fileStore.delete(fileId)
  if (deleted) {
    console.log(`[FileStorage] Deleted file ${fileId}`)
  }
}

export function getStorageStats(): { fileCount: number; totalSize: number } {
  let totalSize = 0
  fileStore.forEach((file) => {
    totalSize += file.buffer.length
  })
  
  return {
    fileCount: fileStore.size,
    totalSize
  }
}

#!/usr/bin/env tsx

import { execSync } from "child_process"
import { existsSync } from "fs"
import path from "path"

console.log("🔍 Debugging build process...")

// Check if contentlayer config exists
const contentlayerConfigPath = path.join(process.cwd(), "contentlayer.config.js")
console.log(`📁 Contentlayer config exists: ${existsSync(contentlayerConfigPath)}`)

// Check if registry index exists
const registryIndexPath = path.join(process.cwd(), "registry", "index.ts")
console.log(`📁 Registry index exists: ${existsSync(registryIndexPath)}`)

// Check if content directory exists
const contentDirPath = path.join(process.cwd(), "content")
console.log(`📁 Content directory exists: ${existsSync(contentDirPath)}`)

// Check if registry directory exists
const registryDirPath = path.join(process.cwd(), "registry")
console.log(`📁 Registry directory exists: ${existsSync(registryDirPath)}`)

try {
  console.log("🔧 Testing contentlayer build...")
  execSync("contentlayer2 build", { stdio: "inherit" })
  console.log("✅ Contentlayer build successful")
} catch (error) {
  console.log("❌ Contentlayer build failed:", error)
}

try {
  console.log("🔧 Testing registry build...")
  execSync("tsx --tsconfig ./tsconfig.scripts.json ./scripts/build-registry.mts", { stdio: "inherit" })
  console.log("✅ Registry build successful")
} catch (error) {
  console.log("❌ Registry build failed:", error)
}

console.log("�� Debug complete") 
import type { KVNamespace, R2Bucket } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    /** تخزين المقالات والوسائط (يعمل بدون تفعيل R2) */
    ARTICLES?: KVNamespace;
    /** اختياري: عند تفعيل R2 في الحساب يمكن إضافة binding MEDIA لنقل التخزين */
    MEDIA?: R2Bucket;
    ADMIN_PASSWORD?: string;
  }
}

export {};

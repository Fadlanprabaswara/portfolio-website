export default function Footer() {
  return (
    <footer className="py-6 border-t dark:border-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Designed and built with ❤️ using Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}


interface PublicationFooterProps {
  publicationTitle?: string
  showPanacheAttribution?: boolean
}

export default function PublicationFooter({
  publicationTitle,
  showPanacheAttribution = false,
}: PublicationFooterProps) {
  const currentYear = new Date().getFullYear()
  const displayName = publicationTitle || 'Newsletter'

  return (
    <footer>
      <div className="p-4 text-xs bg-[#f0eee6] border-t border-neutral-300">
        <div className="max-w-4xl mx-auto w-full text-neutral-600 text-center flex justify-between">
          <p>
            © {currentYear} · {displayName}
          </p>
          {showPanacheAttribution && (
            <p className="mt-1">
              This newsletter is powered by{' '}
              <a href="https://panache.so" className="underline text-blue-500 hover:text-blue-600">
                Panache
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}

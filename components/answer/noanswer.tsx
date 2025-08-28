export default function NoAnswer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h2 className="text-2xl font-semibold mb-4">No Answers Found</h2>
      <p className="text-gray-600 mb-6">
        It looks like you haven't uploaded any answers yet. Start by uploading your first answer!
      </p>
      <Link href="/upload">
        <Button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90">
          <Plus className="w-5 h-5" />
          New Answer
        </Button>
      </Link>
    </div>
  );
}
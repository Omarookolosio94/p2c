namespace p2c.api;

public class Helpers
{
    public static (string Id1, string Id2) SplitReferenceId(string referenceId)
    {
        if (string.IsNullOrEmpty(referenceId))
        {
            return (string.Empty, string.Empty);
        }

        var parts = referenceId.Split(new[] { "|||" }, StringSplitOptions.None);
        if (parts.Length != 2)
        {
            return (string.Empty, string.Empty);
        }

        return (parts[0], parts[1]);
    }
}